import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { StateProvider } from './reducers/StateProvider'
import AuthReducer, { initialState } from './reducers/AuthReducer'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StateProvider reducer={AuthReducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>
)
