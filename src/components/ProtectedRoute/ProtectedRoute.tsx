// TODO: move to shared library
import { Outlet } from 'react-router'
import { getToken } from '@app/utils/auth'

export function ProtectedRoute() {
  if (!getToken()) {
    window.location.href = '/login'
    return null
  }
  return <Outlet />
}
