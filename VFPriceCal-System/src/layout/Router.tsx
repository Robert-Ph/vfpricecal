import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../page/dashboard/Dashboard";
import UserManagement from "../page/userManagement/UserManagement";
import AddCompany from "../page/userManagement/AddCompany";

export const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
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