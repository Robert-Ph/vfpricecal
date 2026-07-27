import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import QuotationPage from "../pages/QuotationPage/QuotationPage";
import ProductPage from "../pages/ProductPage/ProductPage";
// import ProductDetail from "../pages/ProductPage/ProductDetail/ProductDetail";
import ComponentPaper from "../pages/PriceComponent/Paper/Material";
import Processing from "../pages/PriceComponent/Processing/Processing";
import ProcessingDetail from "../pages/PriceComponent/Processing/ProcessingDetail";
import PaperDetail from "../pages/PriceComponent/Paper/MaterialDetail";
import PaperAdd from "../pages/PriceComponent/Paper/MaterialAdd";
import Login from "../pages/Auth/Login";
import Profit from "../pages/PriceComponent/profit/Profit";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import UserManagement from "../pages/SystemPage/User/UserManagement";
import PrintCost from "../pages/PriceComponent/PrintCost/PrintCost";
import SystemSetting from "../pages/SystemPage/Setting/SystemSetting";
import SystemBackup from "../pages/SystemPage/Backup/SystemBackup"
import Discount from "../pages/PriceComponent/discount/Discount";
import QuotationMobile from "../pages/QuotationPage/QuotationMobile";
import PrintCostDetail from "../pages/PriceComponent/PrintCost/PrintCostDetail";
import PrintCostNew from "../pages/PriceComponent/PrintCost/PrintCostNew";
import DiscountDetail from "../pages/PriceComponent/discount/DiscountDetail";
import DiscountNew from "../pages/PriceComponent/discount/DiscountNew";
import About from "../pages/about/About";
import ProfitNew from "../pages/PriceComponent/profit/ProfitNew";
import ProfitDetail from "../pages/PriceComponent/profit/ProfitDetail";
import LoginPage from "../pages/Auth/LoginMobile";
import QuotationAdmin from "../pages/QuotationPage/QuotationAdmin";
import CustomerProfile from "../pages/SystemPage/CustomerProfile";
import NewProduct from "../pages/ProductPage/NewProduct";
import NewProcessing from "../pages/PriceComponent/Processing/NewProcessing";
import ProcessingTier from "../pages/PriceComponent/Processing/ProcessingTier";
import QuotationPreview from "./QuotationPreview";
import Log from "../pages/SystemPage/log/Log";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/mobile",
    element: <LoginPage/>
  },
  { path: "quotation-mobile", 
    element: <QuotationAdmin/>},
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/bao-gia/:companyName/:phone/:companyId",
    element: <QuotationMobile />,
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
      { path: "quotation", element: <QuotationPage /> }, // Chuyển Quotation sang một path cụ thể
      { path: "product", element: <ProductPage /> },
      { path: "product/new", element: <NewProduct /> },
      // { path: "product/:id", element: <ProductDetail /> },
      { path: "component/papers", element: <ComponentPaper /> },
      { path: "component/paper/add", element: <PaperAdd /> },
      { path: "component/processing", element: <Processing /> },
      { path: "component/processing/:id", element: <ProcessingDetail /> },
      { path: "component/processing/new/:id", element: <NewProcessing/>},
      { path: "component/processing/detail/:id", element: <ProcessingTier/>},
      { path: "component/papers/:id", element: <PaperDetail /> },
      { path: "system/users", element: <UserManagement /> },
      { path: "component/printcost", element: <PrintCost /> },
      { path: "component/printcost/detail/:id", element: <PrintCostDetail /> },
      { path: "component/printcost/new", element: <PrintCostNew /> },
      { path: "component/discount", element: <Discount />},
      { path: "component/discount/:id", element: <DiscountDetail/>},
      { path: "component/discount/new", element: <DiscountNew/>},
      { path: "system/settings", element: <SystemSetting /> },
      { path: "system/backup", element: <SystemBackup /> },
      { path: "system/log", element: <Log/>},
      { path: "component/profit", element: <Profit />},
      { path: "component/profit/new", element: <ProfitNew/>},
      { path: "component/profit/:id", element: <ProfitDetail/>},
      { path: "about", element: <About/>},
      { path: "system/profile", element: <CustomerProfile/>},
      { path: "export-pdf", element: <QuotationPreview/>}


    ],
  },
  // Thêm một route "catch-all" nếu muốn mọi đường dẫn lạ đều về login
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);