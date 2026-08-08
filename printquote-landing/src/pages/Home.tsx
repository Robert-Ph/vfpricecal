import { useEffect } from "react";
import CTA from "../component/CTA";
import FAQ from "../component/FAQ";
import Features from "../component/Features";
import Footer from "../component/Footer";
import Hero from "../component/Hero";
import Navbar from "../component/Navbar";
import Pricing from "../component/Pricing";
// import Statistics from "../component/Statistics";
// import Testimonials from "../component/Testimonials";
import Workflow from "../component/Workflow";
import { getAllPlan, getAllSystemConfig } from "../service/SystemConfigService";
import type { plansResponse, systemConfig } from "../api/ConfigModal";

export default function Home() {

  useEffect(() => {
        const fetchDataConfig = async () => {
            const response = await getAllSystemConfig();
            const config: systemConfig[] = response.data;
            console.log(response)
            localStorage.setItem("systemConfig", JSON.stringify(config));
            
        }

        const fetchDataCPlans = async () => {
            const response = await getAllPlan();
            const config: plansResponse[] = response.data;
            localStorage.setItem("plans", JSON.stringify(config));
            
        }

 const hash = window.location.hash;

  setTimeout(() => {
    if (hash) {
      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, 100);

        void fetchDataConfig();
        void fetchDataCPlans();
    },[])
  return (
    <>
      <Navbar />
      <Hero/>
      <section id="features">
          <Features />
      </section>
      <Workflow/>
      <section id="pricing">
        <Pricing />
      </section>
  {/* <Statistics/>
      <Testimonials/> */}
      <FAQ/>
      <CTA/>
      <Footer/>
    </>
  );
}