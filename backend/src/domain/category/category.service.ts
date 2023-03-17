import CategoryModel from './category.model'
import { type Category } from './types'

export const getAllCategories = () => {
  return CategoryModel.find()
}

export const addCategory = async (resultData: Category) => {
  const result = new CategoryModel(resultData)
  await result.save()
}

export const deleteCategory = (id: string) => {
  return CategoryModel.findByIdAndDelete(id)
}
