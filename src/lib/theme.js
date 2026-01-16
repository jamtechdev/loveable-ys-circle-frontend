'use client'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#e04179ff',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})

export default theme
