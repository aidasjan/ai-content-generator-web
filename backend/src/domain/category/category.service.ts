import CategoryModel from './category.model'
import { type Category } from './types'

export const getAllCategories = () => {
  return CategoryModel.find()
}

export const getCategory = (id: string) => {
  return CategoryModel.findById(id)
}

export const addCategory = async (resultData: Category) => {
  const result = new CategoryModel(resultData)
  await result.save()
  return result
}

export const deleteCategory = (id: string) => {
  return CategoryModel.findByIdAndDelete(id)
}
