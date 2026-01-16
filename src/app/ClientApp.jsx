'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { usePathname } from 'next/navigation'
import Sidebar from '../components/layout/Sidebar'
import AuthLayout from '../components/layout/AuthLayout'
import { Box, CircularProgress } from '@mui/material'

// Define public routes that don't need authentication
const PUBLIC_ROUTES = ['/login', '/register', '/about', '/contact', '/privacy', '/']

export default function ClientApp({ children }) {
  const pathname = usePathname()
  const { user, loading } = useAuth()

  // Check if current route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname?.startsWith(route))

  // Auth pages (login/register) use AuthLayout
  if (pathname?.startsWith('/login') || pathname?.startsWith('/register')) {
    return <AuthLayout>{children}</AuthLayout>
  }

  // Public pages render directly without auth check
  if (isPublicRoute) {
    return <>{children}</>
  }

  // Protected routes require authentication
  if (loading || !user) {
    return (
      <Box className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </Box>
    )
  }

  // Role-based route guard
  const roleFromPath = pathname?.split('/')[1]
  if (roleFromPath && !user.roles?.includes(roleFromPath)) {
    if (user.roles?.length > 0) {
      window.location.href = `/${user.roles[0]}/dashboard`
      return null
    }
    window.location.href = `/login`
    return null
  }

  // Render dashboard with sidebar for authenticated users
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar user={user} />
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  )
}
