const BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8080'

export const sendRequest = async (
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
  const result = await response.json()
  return result
}
