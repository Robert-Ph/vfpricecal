import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../page/dashboard/Dashboard";
import UserManagement from "../page/userManagement/UserManagement";
import AddCompany from "../page/userManagement/AddCompany";
import Login from "../page/login/Login";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([

  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Thay đổi ở đây: Khi vào "/" sẽ tự động điều hướng sang "/login"
      { 
        index: true, 
        element: <Navigate to="/login" replace /> 
      },
        {
            path: "/dashboard",
            element: <Dashboard />
        },
        {
          path: "/user-management",
          element: <UserManagement />
        },
        {
          path:"/user-management/add",
          element: <AddCompany />
        }

    ],
  },
 
]);