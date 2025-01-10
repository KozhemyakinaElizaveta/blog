import axios from 'shared/api/axios'

export function login(username: string, password: string) {
  return axios.post(
    '/api/auth/login',
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  )
}

export const registerUser = async (userData: {
  username: string
  password: string
}) => {
  return axios.post('/api/auth/register', userData, {
    withCredentials: true,
  })
}

export function logout(userId: number) {
    return axios.post('/api/auth/logout', { userId }, {
      withCredentials: true,
    })
  }