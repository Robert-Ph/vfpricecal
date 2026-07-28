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

export default function Home() {
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