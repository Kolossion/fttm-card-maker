export function generateGradientString(colors: Array<string>, numNameLines: number = 1) {
  const finalBreakpoint: number = 90 - (numNameLines * 5)
  const secondLastBreakpoint: number = finalBreakpoint - 5
  return `
    linear-gradient(0deg, #000 5%, ${colors[1]} 10%, ${colors[0]} 30%, ${colors[0]} ${secondLastBreakpoint}%, #000 ${finalBreakpoint}%)
  `
}