import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../lib/auth/authService'

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.login(email, password)
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, password_confirmation }, { rejectWithValue }) => {
    try {
      const data = await authService.register(name, email, password, password_confirmation)
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getUser()
      return data
    } catch (error) {
      localStorage.removeItem('token')
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user')
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout()
      localStorage.removeItem('token')
      return null
    } catch (error) {
      localStorage.removeItem('token')
      return rejectWithValue(error.response?.data?.message || 'Logout failed')
    }
  }
)

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    clearCredentials: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Fetch User
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })
  },
})

export const { setCredentials, clearCredentials, clearError } = authSlice.actions
export default authSlice.reducer
