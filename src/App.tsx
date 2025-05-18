import './App.css'
import { router } from './router'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from '@emotion/react'
import theme from './Them'


function App() {


  return (
    <>
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
