import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import AuthLayout from './components/AuthLayout.jsx'
import EditorWindow from './pages/EditorWindow.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import HomePage from './pages/HomePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <AuthLayout authentication>
            <HomePage />
          </AuthLayout>
        )
      },
      {
        path: '/workspace/:id',
        element: (
          <AuthLayout authentication>
            <EditorWindow />
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        // element : (
        //   <AuthLayout authentication>
        //     {" "}
        //     <AddPost/>
        //   </AuthLayout>
        // )
      },
      {
        path: "/edit-post/:slug",
        // element : (
        //   <AuthLayout authentication>
        //     {" "}
        //     <EditPost />
        //   </AuthLayout>
        // )
      },
      {
        path: "/post/:slug",
        // element : <Post />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>,
)
