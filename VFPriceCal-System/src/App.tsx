import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from "./layout/Router";
import { ToastContainer } from "react-toastify";
function App() {


 return(
  <>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
 )
}

export default App
