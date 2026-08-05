import { useEffect } from "react";
import CTA from "../component/CTA";
import FAQ from "../component/FAQ";
import Features from "../component/Features";
import Footer from "../component/Footer";
import Hero from "../component/Hero";
import Navbar from "../component/Navbar";
import Pricing from "../component/Pricing";
import Statistics from "../component/Statistics";
import Testimonials from "../component/Testimonials";
import Workflow from "../component/Workflow";
import { getAllPlan, getAllSystemConfig } from "../service/SystemConfigService";
import type { plansResponse, systemConfig } from "../api/ConfigModal";

export default function Home() {

  useEffect(() => {
        const fetchDataConfig = async () => {
            const response = await getAllSystemConfig();
            const config: systemConfig[] = response.data;

            localStorage.setItem("systemConfig", JSON.stringify(config));
            
        }

        const fetchDataCPlans = async () => {
            const response = await getAllPlan();
            const config: plansResponse[] = response.data;

            localStorage.setItem("plans", JSON.stringify(config));
            
        }

        void fetchDataConfig();
        void fetchDataCPlans();
    },[])
  return (
    <>
      <Navbar />
      <Hero/>
      <Features/>
        <Workflow/>
        <Pricing/>
        <Statistics/>
        <Testimonials/>
        <FAQ/>
        <CTA/>
        <Footer/>
    </>
  );
}