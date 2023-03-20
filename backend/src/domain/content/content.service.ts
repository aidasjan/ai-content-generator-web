import { generateContent } from '../../services/openAi'
import { getCategory } from '../category'
import { getManyProperties } from '../property'
import ContentModel from './content.model'
import { type Content } from './types'

export const getContent = (id: string) => {
  return ContentModel.findById(id)
}

export const getPublicContents = () => {
  return ContentModel.find({ isPublic: true })
}

export const getUserContents = async (userId: string | undefined) => {
  if (!userId) {
    return null
  }
  return await ContentModel.find({ user: { id: userId } })
}

export const addContents = async (resultData: Content) => {
  const result = new ContentModel(resultData)
  await result.save()
}

export const deleteContent = (id: string) => {
  return ContentModel.findByIdAndDelete(id)
}

export const createContent = async (
  categoryId: string,
  propertyIds: string[],
  keywords: string[]
) => {
  const category = await getCategory(categoryId)
  const properties = await getManyProperties(propertyIds)

  console.log('properties', properties)

  if (!category || !properties) {
    return null
  }

  const prompt = `Create ${
    category.title
  } that has the following properties: ${properties
    .map((property) => property.title)
    .join(', ')}. The ${
    category.title
  } should include the following keywords: ${keywords.join(', ')}.`

  console.log('[prompt]', prompt)

  const result = await generateContent(prompt)

  return result
}
