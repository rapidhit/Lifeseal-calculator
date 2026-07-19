// Client-side "Download as PDF" using html2canvas-pro + jsPDF.
// (html2canvas-pro, not html2canvas: Tailwind v4 emits oklch() colors,
// which classic html2canvas 1.4.x cannot parse — renders blank output.)
//
// Pagination strategy: ONE SECTION PER PAGE. Each direct child of the
// target node is captured on its own, so no two details ever share a page
// and no card is ever sliced through the middle. Sections taller than an
// A4 page are scaled down to fit; only extremely tall ones (below 55%
// legibility) are allowed to continue onto extra pages — still alone.

const PAGE_MARGIN_PT = 28
const CAPTURE_WIDTH = 1100
const MIN_FIT_SCALE = 0.55

export async function downloadReadingPdf(node: HTMLElement, filename: string): Promise<void> {
  const [html2canvasModule, jspdfModule] = await Promise.all([
    import('html2canvas-pro'),
    import('jspdf'),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html2canvas = ((html2canvasModule as any).default ?? html2canvasModule) as (
    el: HTMLElement,
    opts?: Record<string, unknown>,
  ) => Promise<HTMLCanvasElement>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const JsPDF = (jspdfModule as any).jsPDF ?? (jspdfModule as any).default

  if (typeof html2canvas !== 'function') throw new Error('html2canvas failed to load')
  if (!JsPDF) throw new Error('jsPDF failed to load')

  // Sections are explicitly tagged with data-pdf-section in the markup —
  // no structural guessing. Keep only the outermost tagged elements.
  let sections = Array.from(node.querySelectorAll<HTMLElement>('[data-pdf-section]'))
  sections = sections.filter((s) => !sections.some((o) => o !== s && o.contains(s)))
  sections = sections.filter((s) => s.offsetHeight > 0)
  if (sections.length === 0) {
    // Fallback for untagged content: direct children, descending one level
    // if the wrapper holds a single inner container.
    sections = Array.from(node.children) as HTMLElement[]
    if (sections.length === 1 && sections[0].children.length > 1) {
      sections = Array.from(sections[0].children) as HTMLElement[]
    }
    sections = sections.filter((s) => s.offsetHeight > 0)
    if (sections.length === 0) sections = [node]
  }

  const pdf = new JsPDF({ unit: 'pt', format: 'a4' })
  const pageW = pdf.internal.pageSize.getWidth() as number
  const pageH = pdf.internal.pageSize.getHeight() as number
  const availW = pageW - PAGE_MARGIN_PT * 2
  const availH = pageH - PAGE_MARGIN_PT * 2

  let firstPage = true

  for (const section of sections) {
    // Wrap the clone so each capture carries the parchment background
    // and breathing room, at a fixed width for consistent layout.
    const wrap = document.createElement('div')
    Object.assign(wrap.style, {
      position:      'fixed',
      top:           '0',
      left:          '0',
      width:         `${CAPTURE_WIDTH}px`,
      zIndex:        '-9999',
      pointerEvents: 'none',
      background:    '#f7f4ec',
      padding:       '40px',
      boxSizing:     'border-box',
    })
    wrap.appendChild(section.cloneNode(true))
    document.body.appendChild(wrap)

    try {
      const canvas = await html2canvas(wrap, {
        scale:           2,
        useCORS:         true,
        allowTaint:      true,
        backgroundColor: '#f7f4ec',
        logging:         false,
        scrollX:         0,
        scrollY:         0,
        windowWidth:     CAPTURE_WIDTH,
      })

      const widthFitH = (canvas.height * availW) / canvas.width

      if (!firstPage) pdf.addPage()
      firstPage = false

      if (widthFitH <= availH) {
        // Fits on one page at full width — centre it vertically.
        const y = PAGE_MARGIN_PT + (availH - widthFitH) / 2
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', PAGE_MARGIN_PT, y, availW, widthFitH, undefined, 'FAST')
      } else if (availH / widthFitH >= MIN_FIT_SCALE) {
        // Taller than a page but still legible when scaled to fit —
        // shrink to page height and centre horizontally.
        const scale = availH / widthFitH
        const w = availW * scale
        const x = PAGE_MARGIN_PT + (availW - w) / 2
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, PAGE_MARGIN_PT, w, availH, undefined, 'FAST')
      } else {
        // Extremely tall section: keep full width and let it continue on
        // additional pages — but never sharing a page with another section.
        const pxPerPt = canvas.width / availW
        const pageHeightPx = availH * pxPerPt
        let renderedPx = 0
        let firstSlice = true
        while (renderedPx < canvas.height) {
          const sliceH = Math.min(pageHeightPx, canvas.height - renderedPx)
          const tmp = document.createElement('canvas')
          tmp.width = canvas.width
          tmp.height = sliceH
          const ctx = tmp.getContext('2d')!
          ctx.fillStyle = '#f7f4ec'
          ctx.fillRect(0, 0, tmp.width, tmp.height)
          ctx.drawImage(canvas, 0, renderedPx, canvas.width, sliceH, 0, 0, canvas.width, sliceH)
          if (!firstSlice) pdf.addPage()
          pdf.addImage(tmp.toDataURL('image/png'), 'PNG', PAGE_MARGIN_PT, PAGE_MARGIN_PT, availW, (sliceH * availW) / canvas.width, undefined, 'FAST')
          firstSlice = false
          renderedPx += sliceH
        }
      }
    } finally {
      document.body.removeChild(wrap)
    }
  }

  pdf.save(`${filename}.pdf`)
}
