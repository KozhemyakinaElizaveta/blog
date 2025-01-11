import axios from 'shared/api/axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function login(username: string, password: string) {
  return axios.post(
    `${API_BASE_URL}/api/auth/login`,
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
  return axios.post(`${API_BASE_URL}/api/auth/register`, userData, {
    withCredentials: true,
  })
}

export function logout(userId: number) {
    return axios.post(`${API_BASE_URL}/api/auth/logout`, { userId }, {
      withCredentials: true,
    })
  }