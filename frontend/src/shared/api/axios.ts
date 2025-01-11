import axios from 'axios'
import { RefreshResponse, TPromiseRefresh, TRefresh } from './types'

export function refresh(token: string) {
  return axios.post<RefreshResponse>(
    '/api/auth/refreshToken',
    { refreshToken: token },
    {
      withCredentials: true,
    }
  )
}

let refreshPromise: TPromiseRefresh | null = null

export async function refreshWithoutRepeats() {
  const localCopy = refreshPromise
  let response: TRefresh
  if (localCopy && refreshPromise) {
    response = await refreshPromise
  } else {
    refreshPromise = refresh(localStorage.getItem('refresh') || '')
    const copy: TPromiseRefresh = refreshPromise
    response = await copy
    refreshPromise = null
  }

  if (response.data && response.data.refreshToken) {
    localStorage.setItem('refresh', response.data.refreshToken)
    localStorage.setItem('accessToken', response.data.accessToken)
  } else {
    localStorage.removeItem('refresh')
    localStorage.removeItem('accessToken')
  }

  return response
}

const $api = axios.create({ withCredentials: true, responseType: 'json' })

/* ==$API with response interceptors== */
$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await refreshWithoutRepeats()
        return await $api.request(originalRequest)
      } catch (e) {
        console.log(e)
      }
    }
    throw error
  }
)

export default $api
