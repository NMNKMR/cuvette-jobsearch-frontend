import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import AddJob from './pages/AddJob.jsx'
import ViewJob from './pages/ViewJob.jsx'
import EditJob from './pages/EditJob.jsx'
import AuthCheck from './components/AuthCheck.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signin",
        element: (
          <AuthCheck authentication={false}>
            <SignIn />
          </AuthCheck>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthCheck authentication={false}>
            <SignUp />
          </AuthCheck>
        ),
      },
      {
        path: "job",
        children: [
          {
            path: "add",
            element: (
              <AuthCheck>
                <AddJob />
              </AuthCheck>
            ),
          },
          {
            path: "view/:jobId",
            element: <ViewJob />,
          },
          {
            path: "edit/:jobId",
            element: (
              <AuthCheck>
                <EditJob />
              </AuthCheck>
            ),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
