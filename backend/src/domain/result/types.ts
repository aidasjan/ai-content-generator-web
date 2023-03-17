import { type ObjectId } from 'mongoose'

export interface Result {
  title: string
  content: string
  prompt: string
  isPublic: boolean
  user: ObjectId
}
