import type { Promotion } from './utils/types/promotions';
import type { GrudgeMoves, Move, Wrestler } from './utils/types/wrestler';
import Color from 'color';

export const DEFAULT_WRESTLER: Wrestler = {
  id: 1,
  setCode: '',
  name: 'Wrestler Face',
  nickname: 'The Grimbler',
  gender: 'male',
  height: '6\'0"',
  weight: '200',
  location: 'Scranton, NJ',
  qualities: [
    {
      symbol: "star",
      name: "cheat",
      variant: "g",
      subtext: "Balls"
    },
    {
      symbol: "box",
      name: "favorite",
    },
    {
      symbol: "star",
      name: "helped",
    },
    {
      symbol: "circle",
      name: "strong",
    },
    {
      symbol: "unknown",
      name: "agile",
    },
  ],
  specialty: {
    symbol: "star",
    name: 'My Special Move',
    subtext: '',
    pointValue: 0
  },
  finisher: {
    name: 'The Fuck Move',
    subtext: '',
    finisherRange: {
      low: 11,
      high: 66,
      special: false
    }
  },
  imageName: '',
  grudgeMoves: {
    gold: {
      name: "The Gold Move",
      pointValue: 3
    },
    silver: {
      name: "The Silver Move",
      pointValue: 2
    },
    bronze: {
      name: "The Bronze Move",
      pointValue: 1
    },
  },
  promotion: 'wwe',
  colors: {
    primary: new Color({ r: 0, g: 0, b: 0 }, 'rgb'),
    secondary: null,
    text: new Color({ r: 0, g: 0, b: 0 }, 'rgb')
  },
  set: ''
}

let wrestlers: Wrestler[] = $state([DEFAULT_WRESTLER])
let currentWrestlerIdx: number = $state(0)
let currentWrestler: Wrestler = $derived(wrestlers[currentWrestlerIdx])
let showGrudgeMoves: boolean = $state(true)
let showCutMarks: boolean = $state(true)
let nameHeight: number = $state(0)

export function getCurrentWrestler(): Wrestler {
  return currentWrestler
}

export function getAllWrestlers(): Wrestler[] {
  return wrestlers
}

export function getShowGrudgeMoves(): boolean {
  return showGrudgeMoves
}

export function getShowCutMarks(): boolean {
  return showCutMarks
}

export function getNameHeight(): number {
  return nameHeight
}

export function setNameHeight(height: number) {
  nameHeight = height
}

export function setShowGrudgeMoves(show: boolean) {
  showGrudgeMoves = show
}

export function setShowCutMarks(show: boolean) {
  showCutMarks = show
}

export function updateCurrentWrestlerKey(key: string & keyof Wrestler, value: any) {
  currentWrestler[key] = value
}

export function updateCurrentWrestlerPrimaryColor(color: string) {
  currentWrestler = {
    ...currentWrestler,
    colors: {
      ...currentWrestler.colors,
      primary: Color(color, 'hex')
    }
  }
}

export function updateCurrentWrestlerSecondaryColor(color: string | null) {
  currentWrestler = {
    ...currentWrestler,
    colors: {
      ...currentWrestler.colors,
      secondary: color ? Color(color, 'hex') : null
    }
  }
}

export function updateCurrentWrestlerPromotion(promo: Promotion) {
  currentWrestler.promotion = promo
}

export function updateCurrentWrestlerMove(moveName: string, move: Move) {
  currentWrestler[moveName] = move
}

export function updateCurrentWrestlerGrudgeMove(moveColor: keyof GrudgeMoves & string, move: Move) {
  currentWrestler.grudgeMoves[moveColor] = move
}

export function addDefaultQuality() {
  currentWrestler.qualities.push(
    {
      symbol: "star",
      name: "helped",
    },
  )
}