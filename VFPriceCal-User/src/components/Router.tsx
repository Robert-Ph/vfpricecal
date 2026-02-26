import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import QuotationPage from "../pages/QuotationPage/QuotationPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <QuotationPage /> }

    ],
  },
]);