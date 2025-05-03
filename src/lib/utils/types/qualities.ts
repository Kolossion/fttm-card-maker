import type { TimingSymbol } from "./wrestler"

export const qualityNames = [
  'agile',
  'cheat',
  'favorite',
  'heavy',
  'helped',
  'mean',
  'object',
  'powerful',
  'quick',
  'smart',
  'strong'
] as const

export type QualityName = typeof qualityNames[number]
export type QualityVariant = 'g' | 'm' | 'v'

export type Quality = {
  name: QualityName
  symbol: TimingSymbol
  variant?: QualityVariant
  subtext?: string
}