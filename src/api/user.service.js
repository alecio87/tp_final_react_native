import { api } from './api'
const SERVICE_ENDPOINT = `${api.server + api.apiVersion}/users`

export const getUsers = async () => {
  try {
    const response = await fetch(SERVICE_ENDPOINT)
    return response.json()
  } catch {
    throw new Error('could not fetch users')
  }
}

export const addUser = async (data) => {
  try {
    const response = await fetch(SERVICE_ENDPOINT, {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(data)
    });
   
    return response.json()
  } catch {
    throw new Error('could not create user')
  }
}