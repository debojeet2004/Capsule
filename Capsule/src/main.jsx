import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { store } from './redux/Store'
import { Provider } from 'react-redux'

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { Error, Home } from './Pages/routes.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/> ,
    children: [
      {
        path: "/",
        element: <Home/>,
      }]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>  
    </Provider>,
  </React.StrictMode>,
)
