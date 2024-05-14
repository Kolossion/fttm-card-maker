import shineImg from '$lib/assets/promotions/shine.png'
import wweImg from '$lib/assets/promotions/wwe.png'
import njpwImg from '$lib/assets/promotions/njpw.png'
import type { Promotion } from './types/promotions'

const PROMOTION_IMAGES = {
  aew: "",
  chikara: "",
  czw: "",
  ecw: "",
  eccw: "",
  njpw: njpwImg,
  nwa: "",
  nxt: "",
  roh: "",
  shimmer: "",
  shine: shineImg,
  tna: "",
  wcw: "",
  wsu: "",
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