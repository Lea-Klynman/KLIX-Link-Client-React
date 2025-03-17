import './App.css'
import { Provider } from 'react-redux'
import store from './components/Store'
import { router } from './router'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from '@emotion/react'
import theme from './Them'

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
