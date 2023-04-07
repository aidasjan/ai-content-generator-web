import { type Category } from './category'
import { type Property } from './property'
import { type User } from './user'

export interface Content {
  _id: string
  title: string
  content: string
  prompt: string
  isPublic: boolean
  user: User
  property: Property
  category: Category
}
