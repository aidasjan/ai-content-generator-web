import { sendRequest } from './api'

export const loginUser = async (email: string, password: string) =>
  await sendRequest('/api/users/login', 'POST', { email, password })

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => await sendRequest('/api/users/register', 'POST', { name, email, password })
