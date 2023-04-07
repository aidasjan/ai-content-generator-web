import { sendRequest } from './api'

export const createContent = async (
  category: string,
  properties: string[],
  keywords: string[]
) =>
  await sendRequest('/api/contents/create', 'POST', {
    category,
    properties,
    keywords
  })

export const publishContent = async (id: string, title: string) =>
  await sendRequest(`/api/contents/${id}/publish`, 'POST', {
    title
  })

export const getContent = async (id: string) =>
  await sendRequest(`/api/contents/${id}`, 'GET')

export const getContents = async () => await sendRequest('/api/contents', 'GET')
