import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../page/dashboard/Dashboard";

export const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
            path: "dashboard",
            element: <Dashboard />
        }
    ],
  },
 
]);