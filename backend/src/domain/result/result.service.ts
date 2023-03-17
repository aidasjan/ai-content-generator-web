import ResultModel from './result.model'
import { type Result } from './types'

export const getResult = (id: string) => {
  return ResultModel.findById(id)
}

export const getPublicResults = () => {
  return ResultModel.find({ isPublic: true })
}

export const getUserResults = async (userId: string | undefined) => {
  if (!userId) {
    return null
  }
  return await ResultModel.find({ user: { id: userId } })
}

export const addResult = async (resultData: Result) => {
  const result = new ResultModel(resultData)
  await result.save()
}

export const deleteResult = (id: string) => {
  return ResultModel.findByIdAndDelete(id)
}
