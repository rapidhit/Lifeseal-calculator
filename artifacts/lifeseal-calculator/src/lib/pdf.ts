// Client-side "Download as PDF" for a decoded reading.
// Renders the results DOM node to a canvas (html2canvas) and slices it
// across A4 pages in a jsPDF document — no backend involved.

export async function downloadReadingPdf(node: HTMLElement, filename: string): Promise<void> {
  // Dynamically import to keep the initial bundle small
  const [html2canvasModule, jspdfModule] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  // html2canvas v1 default export
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html2canvas: any = (html2canvasModule as any).default ?? html2canvasModule

  // jsPDF v3+ exports { jsPDF }; v4 may also export default — handle both
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const JsPDF: any = (jspdfModule as any).jsPDF ?? (jspdfModule as any).default

  if (!html2canvas) throw new Error('html2canvas could not be loaded')
  if (!JsPDF) throw new Error('jsPDF could not be loaded')

  const canvas = await html2canvas(node, {
    scale: Math.max(2, window.devicePixelRatio || 1),
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#f7f4ec',
    logging: false,
    // Tell html2canvas to treat the element as if the window has no scroll
    // offset — critical when the offscreen container uses left:-9999px so that
    // the capture area lines up with the element's actual pixel rectangle.
    scrollX: 0,
    scrollY: 0,
    // Fix for elements rendered outside the normal viewport width
    windowWidth: 1100,
    onclone: (_clonedDoc: Document, clonedEl: HTMLElement) => {
      // Ensure the cloned element is visible and at a known position so
      // html2canvas can reliably capture it regardless of where the original
      // sits off-screen.
      clonedEl.style.position = 'relative'
      clonedEl.style.top = '0'
      clonedEl.style.left = '0'
      clonedEl.style.visibility = 'visible'
      clonedEl.style.opacity = '1'
    },
  })

  const pdf = new JsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth  = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const imgWidth   = pageWidth
  // Slice the tall canvas into page-sized chunks so nothing gets cut off mid-card.
  const pxPerPt      = canvas.width / imgWidth
  const pageHeightPx = pageHeight * pxPerPt

  let renderedPx = 0
  let firstPage  = true
  while (renderedPx < canvas.height) {
    const sliceHeightPx = Math.min(pageHeightPx, canvas.height - renderedPx)
    const sliceCanvas   = document.createElement('canvas')
    sliceCanvas.width   = canvas.width
    sliceCanvas.height  = sliceHeightPx
    const ctx = sliceCanvas.getContext('2d')
    if (!ctx) break
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(canvas, 0, renderedPx, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx)
    const sliceData = sliceCanvas.toDataURL('image/png')

    if (!firstPage) pdf.addPage()
    pdf.addImage(sliceData, 'PNG', 0, 0, imgWidth, (sliceHeightPx * imgWidth) / canvas.width, undefined, 'FAST')
    firstPage   = false
    renderedPx += sliceHeightPx
  }

  pdf.save(`${filename}.pdf`)
}
