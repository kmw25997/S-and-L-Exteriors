import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TrustBadges />
      <Services />
      <WhyUs />
      <Gallery />
      <Reviews />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
