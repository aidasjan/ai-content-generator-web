import PropertyModel from './property.model'
import { type Property } from './types'

export const getAllCategories = () => {
  return PropertyModel.find()
}

export const addProperty = async (resultData: Property) => {
  const result = new PropertyModel(resultData)
  await result.save()
}

export const deleteProperty = (id: string) => {
  return PropertyModel.findByIdAndDelete(id)
}
