import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import QuotationPage from "../pages/QuotationPage/QuotationPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProductDetail from "../pages/ProductPage/ProductDetail/ProductDetail";
import ComponentPaper from "../pages/PriceComponent/Paper/ComponentPaper";
import Processing from "../pages/PriceComponent/Processing/Processing";
import ProcessingDetail from "../pages/PriceComponent/Processing/ProcessingDetail";
import PaperDetail from "../pages/PriceComponent/Paper/PaperDetail/PaperDetail";
import UserManagement from "../pages/SystemPage/UserManagement";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/Login/ForgotPassword/ForgotPassword";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <QuotationPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/component/papers", element: <ComponentPaper /> },
      { path: "/component/processing", element: <Processing /> },
      { path: "/component/processing/:id", element: <ProcessingDetail /> },
      { path: "/component/papers/:id", element: <PaperDetail /> },
      { path: "/system/users", element: <UserManagement /> },
    ],
  },
]);