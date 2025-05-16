import type Color from "color"
import type { Promotion } from "./promotions"

export const timingSymbols = {
  'star': "Star",
  'circle': "Circle",
  'box': "Box",
  'unknown': "?",
} as const

export const QUALITY_OPTIONS: { value: QualityName, label: string }[] = [
  { value: 'agile', label: "Agile" },
  { value: 'cheat', label: "Cheat" },
  { value: 'favorite', label: "Favorite" },
  { value: 'heavy', label: "Heavy" },
  { value: 'helped', label: "Helped" },
  { value: 'mean', label: "Mean" },
  { value: 'object', label: "Object" },
  { value: 'powerful', label: "Powerful" },
  { value: 'quick', label: "Quick" },
  { value: 'smart', label: "Smart" },
  { value: 'strong', label: "Strong" },
]

export const QUALITY_VARIANT_OPTIONS: { value: QualityVariant, label: string }[] = [
  { value: 'g', label: "G" },
  { value: 'm', label: "M" },
  { value: 'v', label: "V" },
]

export type TimingSymbol = keyof typeof timingSymbols

export type Gender = 'male' | 'female' | 'other' | 'n/a'

export type QualityName = 'agile' | 'cheat' | 'favorite' | 'heavy' | 'helped' | 'mean' | 'object' | 'powerful' | 'quick' | 'smart' | 'strong'
export type QualityVariant = 'g' | 'm' | 'v'
export type PointValue = number | 'd' | '?'

export type Quality = {
  name: QualityName
  symbol: TimingSymbol
  variant?: QualityVariant
  subtext?: string
}

export interface Move {
  name: string
  symbol?: TimingSymbol
  subtext?: string
  pointValue?: PointValue
  finisherRange?: {
    low: number
    high: number
    special?: boolean
  }
}

export interface GrudgeMoves extends Record<string, any> {
  gold: Move
  silver: Move
  bronze: Move
}

export interface Wrestler extends Record<string, any> {
  id: number
  setCode: string
  name: string
  nickname: string
  gender: Gender
  height: string
  weight: string
  location: string
  qualities: Array<Quality>
  specialty: Move
  finisher: Move
  imageName: string
  grudgeMoves: GrudgeMoves
  promotion: Promotion
  colors: {
    text: Color
    primary: Color
    secondary: Color | null
  }
  set: string
}