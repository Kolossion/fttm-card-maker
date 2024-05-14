
export const promotions = [
  'aew',
  'chikara',
  'czw',
  'ecw',
  'eccw',
  'njpw',
  'nwa',
  'nxt',
  'roh',
  'shimmer',
  'shine',
  'tna',
  'wcw',
  'wsu',
  'wwe',
] as const
export type Promotion = typeof promotions[number]

export const promotionNamesMap = {
  aew: "All Elite Wrestling",
  chikara: "CHIKARA",
  czw: "Combat Zone Wrestling",
  ecw: "Extreme Championship Wrestling",
  eccw: "Elite Canadian Championship Wrestling",
  njpw: "New Japan Pro Wrestling",
  nwa: "National Wrestling Alliance",
  nxt: "WWE NXT",
  roh: "Ring of Honor",
  shimmer: "SHIMMER Women Athletes",
  shine: "SHINE Wrestling",
  tna: "Total Non-stop Action",
  wcw: "World Championship Wrestling",
  wsu: "Women's Superstars United",
  wwe: "World Wrestling Entertainment",
}
