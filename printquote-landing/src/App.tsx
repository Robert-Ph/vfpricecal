// import { useState } from 'react'
import {router} from "./component/Router";
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css'

function App() {


  return  <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </>

}

export default App
