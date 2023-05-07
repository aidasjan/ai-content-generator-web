export interface Category {
  _id: string
  title: string
  parent: Category
  subcategories?: Category[]
}
