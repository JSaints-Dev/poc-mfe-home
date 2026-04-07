import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ProtectedRoute } from '@app/components/ProtectedRoute/ProtectedRoute'

const LoginPage = lazy(() => import('@app/pages/Login/LoginPage').then((m) => ({ default: m.LoginPage })))
const HomePage  = lazy(() => import('@app/pages/Home/HomePage').then((m) => ({ default: m.HomePage })))

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
