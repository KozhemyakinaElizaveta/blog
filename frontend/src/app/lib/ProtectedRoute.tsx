import { ReactNode, useEffect, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { ContainerApp } from 'shared/ui'
import Loading from 'pages/loading'
import { refresh as postRefresh } from 'shared/api/axios'
import { PageRoutes } from 'pages/PageRoutes'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const navigate = useNavigate()
  const isRegistration = useMatch('/registration')
  const refresh = localStorage.getItem('refresh')

  useEffect(() => {
    if (!refresh) {
      localStorage.removeItem('refresh')
      navigate(PageRoutes.Login)
      setIsLoaded(true)
    } else if (!isLoaded && !isRefreshing) {
      setIsRefreshing(true)
      postRefresh(refresh)
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('refresh', data.refreshToken || refresh)
          localStorage.setItem('accessToken', data.accessToken)
          setIsLoaded(true)
        })
        .catch(() => {
          //localStorage.removeItem('refresh');
          //localStorage.removeItem('accessToken');
          //navigate('/');
          setIsLoaded(true)
        })
        .finally(() => {
          setIsRefreshing(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, isRegistration])

  if (!isLoaded) return <Loading />
  return <ContainerApp>{children}</ContainerApp>
}
