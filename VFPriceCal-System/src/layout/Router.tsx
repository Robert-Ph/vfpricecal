import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../page/dashboard/Dashboard";
import UserManagement from "../page/companyManagement/UserManagement";
import AddCompany from "../page/companyManagement/AddCompany";
import Login from "../page/login/Login";
import { Navigate } from "react-router-dom";
import SubscriptionPage from "../page/Subscription/SubscriptionPage";
import CompanyDetail from "../page/companyDetail/CompanyDetail";
import Plans from "../page/plans/Plans";
import CreatePlan from "../page/plans/CreatePlan";
import SubscriptionRenewPage from "../page/renew/SubscriptionRenewPage";
import Orders from "../page/orders/Orders";
import PaymentPage from "../page/paymentPay/PaymentPage";
import PlanDetail from "../page/plans/Plandetail";
import SystemConfig from "../page/system/SystemConfig";

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
          path: "/company-management",
          element: <UserManagement />
        },
        {
          path:"/company-management/add",
          element: <AddCompany />
        },
        {
          path:"/subscription",
          element: <SubscriptionPage/>
        },
        {
          path: "/company-management/:id",
          element: <CompanyDetail/>
        },
        {
          path: "/plans",
          element: <Plans/>
        },
        {
          path: "/plans/create",
          element: <CreatePlan/>
        },
        {
          path: "/plans/:id",
          element: <PlanDetail/>
        },
        {
          path: "/company-management/select-plan/:type/:id",
          element: <SubscriptionRenewPage/>
        },
        {
          path: "/orders",
          element: <Orders/>
        },
        {
          path: "/payment/:type/:id",
          element: <PaymentPage/>
        },
        {
          path: "/system-config",
          element: <SystemConfig/>
        }

    ],
  },
 
]);