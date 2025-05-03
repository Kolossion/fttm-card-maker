import shineImg from '$lib/assets/promotions/shine.png'
import wweImg from '$lib/assets/promotions/wwe.png'
import njpwImg from '$lib/assets/promotions/njpw.png'
import chikaraImg from '$lib/assets/promotions/chikara.png'
import aewImg from '$lib/assets/promotions/aew.png'
import czwImg from '$lib/assets/promotions/czw.png'
import ecwImg from '$lib/assets/promotions/ecw.png'
import eccwImg from '$lib/assets/promotions/eccw.png'
import luchaImg from '$lib/assets/promotions/lucha.png'
import nwaImg from '$lib/assets/promotions/nwa.png'
import nxtImg from '$lib/assets/promotions/nxt.png'
import rohImg from '$lib/assets/promotions/roh.png'
import shimmerImg from '$lib/assets/promotions/shimmer.png'
import tnaImg from '$lib/assets/promotions/tna.png'
import wcwImg from '$lib/assets/promotions/wcw.png'
import wsuImg from '$lib/assets/promotions/wsu.png'
import type { Promotion } from './types/promotions'

const PROMOTION_IMAGES = {
  aew: aewImg,
  chikara: chikaraImg,
  czw: czwImg,
  ecw: ecwImg,
  eccw: eccwImg,
  lucha: luchaImg,
  njpw: njpwImg,
  nwa: nwaImg,
  nxt: nxtImg,
  roh: rohImg,
  shimmer: shimmerImg,
  shine: shineImg,
  tna: tnaImg,
  wcw: wcwImg,
  wsu: wsuImg,
  wwe: wweImg,
}

export function getPromotionWatermarkImage(promotion: Promotion) {
  const imageUrl: string = PROMOTION_IMAGES[promotion]
  if (imageUrl === "" || imageUrl == null) {
    return ''
  } else {
    return imageUrl
  }
}