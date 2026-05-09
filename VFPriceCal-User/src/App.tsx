
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './components/Router';
import { AuthProvider } from './context/AuthProvider';

function App() {

  return <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </AuthProvider>;
}

export default App
