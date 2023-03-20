import PropertyModel from './property.model'
import { type Property } from './types'

export const getAllProperties = () => {
  return PropertyModel.find()
}

export const getManyProperties = (ids: string[]) => {
  console.log(ids)
  return PropertyModel.find({ _id: { $in: ids } })
}

export const addProperty = async (resultData: Property) => {
  const result = new PropertyModel(resultData)
  await result.save()
  return result
}

export const deleteProperty = (id: string) => {
  return PropertyModel.findByIdAndDelete(id)
}
