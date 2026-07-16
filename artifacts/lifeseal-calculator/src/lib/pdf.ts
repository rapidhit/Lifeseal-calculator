// Client-side "Download as PDF" using html2canvas + jsPDF.
// Strategy: clone the target node into <body> at a fixed visible position
// so html2canvas always captures it at known coordinates, then remove the clone.

export async function downloadReadingPdf(node: HTMLElement, filename: string): Promise<void> {
  const [html2canvasModule, jspdfModule] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html2canvas = ((html2canvasModule as any).default ?? html2canvasModule) as (el: HTMLElement, opts?: Record<string, unknown>) => Promise<HTMLCanvasElement>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const JsPDF = (jspdfModule as any).jsPDF ?? (jspdfModule as any).default

  if (typeof html2canvas !== 'function') throw new Error('html2canvas failed to load')
  if (!JsPDF) throw new Error('jsPDF failed to load')

  // Clone the node and inject it at (0,0) so html2canvas sees it inside the viewport.
  // zIndex: -9999 keeps it behind all real UI; pointer-events: none blocks interaction.
  const clone = node.cloneNode(true) as HTMLElement
  Object.assign(clone.style, {
    position:      'fixed',
    top:           '0',
    left:          '0',
    width:         '1100px',
    zIndex:        '-9999',
    pointerEvents: 'none',
  })
  document.body.appendChild(clone)

  try {
    const canvas = await html2canvas(clone, {
      scale:           2,
      useCORS:         true,
      allowTaint:      true,
      backgroundColor: '#f7f4ec',
      logging:         false,
      scrollX:         0,
      scrollY:         0,
      windowWidth:     1100,
    })

    const pdf         = new JsPDF({ unit: 'pt', format: 'a4' })
    const pageWidth   = pdf.internal.pageSize.getWidth()  as number
    const pageHeight  = pdf.internal.pageSize.getHeight() as number
    const pxPerPt     = canvas.width / pageWidth
    const pageHeightPx = pageHeight * pxPerPt

    let renderedPx = 0
    let firstPage  = true

    while (renderedPx < canvas.height) {
      const sliceH  = Math.min(pageHeightPx, canvas.height - renderedPx)
      const tmp     = document.createElement('canvas')
      tmp.width     = canvas.width
      tmp.height    = sliceH
      const ctx     = tmp.getContext('2d')!
      ctx.drawImage(canvas, 0, renderedPx, canvas.width, sliceH, 0, 0, canvas.width, sliceH)

      if (!firstPage) pdf.addPage()
      pdf.addImage(
        tmp.toDataURL('image/png'),
        'PNG',
        0, 0,
        pageWidth,
        (sliceH * pageWidth) / canvas.width,
        undefined,
        'FAST',
      )
      firstPage   = false
      renderedPx += sliceH
    }

    pdf.save(`${filename}.pdf`)
  } finally {
    // Always clean up the clone, even if capture threw
    document.body.removeChild(clone)
  }
}
