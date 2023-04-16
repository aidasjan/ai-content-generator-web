import { useToast } from '@chakra-ui/react'

const BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8080'

export const useApi = () => {
  const toast = useToast()

  const sendRequest = async (
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any
  ) => {
    const userDataString = localStorage.getItem('user')
    const userData = userDataString ? JSON.parse(userDataString) : null
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: userData ? `JWT ${userData.token}` : ''
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      if (response.status === 400) {
        const errorResult = await response.json().catch(() => null)
        if (errorResult) {
          toast({ status: 'error', title: errorResult.error })
        }
      } else if (response.status === 500) {
        toast({
          status: 'error',
          title: 'Something went wrong. Please try again later.'
        })
      }
      return null
    }

    const result = await response.json()
    return result
  }

  const loginUser = async (email: string, password: string) =>
    await sendRequest('/api/users/login', 'POST', { email, password })

  const registerUser = async (name: string, email: string, password: string) =>
    await sendRequest('/api/users/register', 'POST', { name, email, password })

  const getCategories = async () => await sendRequest('/api/categories', 'GET')

  const addCategory = async (title: string, parent: string | null) =>
    await sendRequest('/api/categories', 'POST', { title, parent })

  const deleteCategory = async (id: string) =>
    await sendRequest(`/api/categories/${id}`, 'DELETE')

  const createContent = async (
    category: string,
    properties: string[],
    keywords: string[]
  ) =>
    await sendRequest('/api/contents/create', 'POST', {
      category,
      properties,
      keywords
    })

  const publishContent = async (id: string, title: string) =>
    await sendRequest(`/api/contents/${id}/publish`, 'POST', {
      title
    })

  const saveContent = async (id: string) =>
    await sendRequest(`/api/contents/${id}/save`, 'POST')

  const getContent = async (id: string) =>
    await sendRequest(`/api/contents/${id}`, 'GET')

  const getContents = async () => await sendRequest('/api/contents', 'GET')

  const getSelfContents = async () =>
    await sendRequest('/api/contents/self', 'GET')

  const deleteContent = async (id: string) =>
    await sendRequest(`/api/contents/${id}`, 'DELETE')

  const getProperties = async () => await sendRequest('/api/properties', 'GET')

  const addProperty = async (title: string) =>
    await sendRequest('/api/properties', 'POST', { title })

  const deleteProperty = async (id: string) =>
    await sendRequest(`/api/properties/${id}`, 'DELETE')

  const getUsers = async () => await sendRequest('/api/users', 'GET')

  const deleteUser = async (id: string) =>
    await sendRequest(`/api/users/${id}`, 'DELETE')

  return {
    loginUser,
    registerUser,
    getCategories,
    addCategory,
    deleteCategory,
    createContent,
    publishContent,
    saveContent,
    getContent,
    getContents,
    getSelfContents,
    deleteContent,
    getProperties,
    addProperty,
    deleteProperty,
    getUsers,
    deleteUser
  }
}
