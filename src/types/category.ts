export interface Category {
  _id: string
  title: string
  subcategories?: Category[]
}
