export const ASSETS_PATH = "./";
export function asset(str: string) {
  return ASSETS_PATH.concat(str)
}