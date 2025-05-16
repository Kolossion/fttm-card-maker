import type { TimingSymbol } from "./types/wrestler";

/**
 * Convert the provided string to kebab-case
 * 
 * @param input 
 * @returns
 */
export function toKebabCase(input: string): string {
  if (!input) {
    return input;
  }
  return ('' + input).trim().replace(/ /g, '-').toLowerCase();
}

export function getStringFromSymbol(symbol: TimingSymbol | undefined) {
  switch (symbol) {
    case "box":
      return "C"
    case "circle":
      return "5"
    case "star":
      return 'F'
    case "unknown":
      return '?'
    default:
      return ''
  }
}