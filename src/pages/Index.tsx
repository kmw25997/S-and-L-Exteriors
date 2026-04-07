import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import BeforeAfter from "@/components/BeforeAfter";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TrustBadges />
      <Services />
      <WhyUs />
      <BeforeAfter />
      <Gallery />
      <Reviews />
      <ServiceAreaMap />
      <CallToAction />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
