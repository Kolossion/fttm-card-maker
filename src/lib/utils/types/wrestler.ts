import type Color from "color"
import type { Promotion } from "./promotions"

export const timingSymbols = {
  'star': "Star",
  'circle': "Circle",
  'box': "Box",
  'unknown': "?",
} as const
export type TimingSymbol = keyof typeof timingSymbols

export type Gender = 'male' | 'female' | 'other' | 'n/a'

export type QualityName = 'agile' | 'cheat' | 'favorite' | 'heavy' | 'helped' | 'mean' | 'object' | 'powerful' | 'quick' | 'smart' | 'strong'
export type QualityVariant = 'g' | 'm' | 'v'
export type PointValue = number | 'd'

export type Quality = {
  name: QualityName
  symbol: TimingSymbol
  variant?: QualityVariant
  subtext?: string
}

export interface Move {
  name: string
  subtext?: string
}

export type SpecialtyMove = Move & {
  pointValue: PointValue
  symbol?: TimingSymbol
}

export type FinisherMove = Move & {
  finisherRange: {
    low: number
    high: number
    special?: boolean
  }
}

export type GrudgeMove = Move & {
  pointValue: PointValue
}

export type Wrestler = {
  id: number
  setCode: string
  name: string
  nickname: string
  gender: Gender
  height: string
  weight: string
  location: string
  qualities: Array<Quality>
  specialty: SpecialtyMove
  finisher: FinisherMove
  imageName: string
  grudgeMoves: {
    gold: GrudgeMove
    silver: GrudgeMove
    bronze: GrudgeMove
  } | null
  promotion: Promotion
  colors: {
    primary: Color
    secondary?: Color
  }
  set: string
}