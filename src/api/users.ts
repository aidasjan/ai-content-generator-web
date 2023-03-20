import { sendRequest } from './api'

export const getUsers = async () =>
  await sendRequest('/api/users', 'GET')

export const deleteUser = async (id: string) =>
  await sendRequest(`/api/users/${id}`, 'DELETE')
