import { createBrowserRouter
    // , Navigate 
} from "react-router-dom";
import Home from "../pages/Home";
import TrialRegister from "../pages/TrialRegister";
import Contact from "../pages/Contact";


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
 }
]);