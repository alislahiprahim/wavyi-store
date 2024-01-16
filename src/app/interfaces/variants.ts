
export interface VariantOption {
  id: string
  name: string,
  variantId: string
  productItemId: string[]
  isDisable?: boolean
}
export interface Variant {
  id: string
  type: 'Text' | 'Color' | 'Size'
  name: string
  options: VariantOption[],
}
