import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import QuotationPage from "../pages/QuotationPage/QuotationPage";
import ProductPage from "../pages/ProductPage/ProductPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <QuotationPage /> },
      { path: "/product", element: <ProductPage /> },

    ],
  },
]);