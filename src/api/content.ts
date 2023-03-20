import { sendRequest } from './api'

export const createContent = async (
  category: string,
  properties: string[],
  keywords: string[]
) =>
  await sendRequest('/api/content/create', 'POST', { category, properties, keywords })
