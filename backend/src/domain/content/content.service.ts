import { generateContent } from '../../services/openAi'
import { getCategory } from '../category'
import { generatePrompt } from '../prompt'
import { getManyProperties } from '../property'
import ContentModel from './content.model'

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

export const publishContent = async (id: string, title: string) => {
  const existingContent = await ContentModel.findById(id)
  if (existingContent) {
    existingContent.title = title
    existingContent.isPublic = true
    await existingContent.save()
    return existingContent
  }
  return null
}

export const deleteContent = (id: string) => {
  return ContentModel.findByIdAndDelete(id)
}

export const createContent = async (
  categoryId: string,
  propertyIds: string[],
  keywords: string[],
  user?: Express.User
) => {
  const category = await getCategory(categoryId)
  const properties = await getManyProperties(propertyIds)

  if (!category?.title || !properties || !user) {
    return null
  }

  const propertyStrings = properties
    .map((p) => p.title ?? '')
    .filter((p) => p !== '')

  const prompt = await generatePrompt(category.title, propertyStrings, keywords)

  if (!prompt) {
    return null
  }

  const generatedContentValue = await generateContent(prompt)
  const newContent = new ContentModel({
    content: generatedContentValue,
    properties,
    category,
    user: user.id,
    prompt,
    isPublic: false
  })
  newContent.save()
  return newContent
}
