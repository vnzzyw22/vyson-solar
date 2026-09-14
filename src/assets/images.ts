import hero from './images/hero.webp'
import residencial from './images/case-residencial.webp'
import comercialIndustrial from './images/case-comercial-industrial.webp'
import rural from './images/case-rural.webp'

export const IMAGES = {
  hero,
  residencial,
  'comercial-industrial': comercialIndustrial,
  rural,
} as const

export type ImageKey = keyof typeof IMAGES
