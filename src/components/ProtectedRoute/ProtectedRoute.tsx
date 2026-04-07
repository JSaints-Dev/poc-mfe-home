// TODO: move to shared library
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { getToken } from '@app/utils/auth'

export function ProtectedRoute() {
  const location = useLocation()

  useEffect(() => {
    if (!getToken()) {
      window.location.href = '/login'
    }
  }, [location.pathname])

  if (!getToken()) {
    return null
  }

  return <Outlet />
}
