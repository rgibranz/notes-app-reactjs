import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import './App.css'

import LoginForm from "./LoginForm.jsx";
import Notes from "./Notes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm/>,
  },
  {
    path: "/notes",
    element: <Notes/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
