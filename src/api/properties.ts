import { sendRequest } from './api'

export const getProperties = async () =>
  await sendRequest('/api/properties', 'GET')

export const addProperty = async (title: string) =>
  await sendRequest('/api/properties', 'POST', { title })

export const deleteProperty = async (id: string) =>
  await sendRequest(`/api/properties/${id}`, 'DELETE')
