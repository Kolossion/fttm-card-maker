import { derived, get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Wrestler } from './utils/types/wrestler';
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
  qualities: [{
    symbol: "star",
    name: "cheat",
    variant: "g",
    subtext: "Balls"
  }],
  specialty: {
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
    primary: new Color({ r: 0, g: 0, b: 0 }, 'rgb')
  },
  set: ''
}

export const showGrudgeMoves = writable<boolean>(true)
export const showCutMarks = writable<boolean>(true)
export const wrestlers = writable<Array<Wrestler>>([{ ...DEFAULT_WRESTLER }])
export const selectedWrestler = writable<number>(0)
export const wrestler = derived<Writable<Array<Wrestler>>, Wrestler>(wrestlers, ($wrestlers) => $wrestlers[get(selectedWrestler)])