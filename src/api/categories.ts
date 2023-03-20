import { sendRequest } from './api'

export const getCategories = async () =>
  await sendRequest('/api/categories', 'GET')

export const addCategory = async (title: string) =>
  await sendRequest('/api/categories', 'POST', { title })

export const deleteCategory = async (id: string) =>
  await sendRequest(`/api/categories/${id}`, 'DELETE')
