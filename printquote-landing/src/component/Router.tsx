import { createBrowserRouter
    // , Navigate 
} from "react-router-dom";
import Home from "../pages/Home";
import TrialRegister from "../pages/TrialRegister";
import Contact from "../pages/Contact";
import TermsOfUser from "../pages/TermsOfUse";
import PrivacyPolicy from "../pages/PrivacyPolicy";


export const router = createBrowserRouter([
 {
    path: "/",
    element: <Home/>
 },
 {
    path: "/dang-ky-dung-thu",
    element: <TrialRegister/>
 },
 {
    path: "/lien-he",
    element: <Contact/>
 },
 {
   path: "/dieu-khoan-su-dung",
   element: <TermsOfUser/>
 },
 {
   path: "/chinh-sach-bao-mat",
   element: <PrivacyPolicy/>
 }
]);