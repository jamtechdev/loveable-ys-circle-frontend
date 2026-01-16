import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  fetchUser,
  clearError
} from '../redux/slices/authSlice'

export function useAuth() {
  const dispatch = useAppDispatch()
  const { user, loading, error, isAuthenticated, token } = useAppSelector((state) => state.auth)

  useEffect(() => {
    // Auto-fetch user if token exists but user data is not loaded
    if (token && !user && !loading) {
      dispatch(fetchUser())
    }
  }, [token, user, loading, dispatch])

  const login = async (email, password) => {
    const result = await dispatch(loginUser({ email, password }))
    return result.meta.requestStatus === 'fulfilled'
  }

  const register = async (name, email, password, password_confirmation) => {
    const result = await dispatch(registerUser({ name, email, password, password_confirmation }))
    return result.meta.requestStatus === 'fulfilled'
  }

  const logout = async () => {
    await dispatch(logoutUser())
  }

  const clearAuthError = () => {
    dispatch(clearError())
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError: clearAuthError,
  }
}
