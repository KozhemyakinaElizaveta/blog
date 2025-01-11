import { AxiosResponse } from 'axios'

export interface RefreshResponse {
  refreshToken: string
  accessToken: string
}

export type TRefresh = AxiosResponse<RefreshResponse>

export type TPromiseRefresh = Promise<TRefresh>
