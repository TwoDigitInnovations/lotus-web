import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import PropertyTypes from "@/components/PropertyTypes";
import WhyChooseUs from "@/components/WhyChooseUs";
import OurProjects from "@/components/OurProjects";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import RecentBlogs from "@/components/RecentBlogs";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <SEO
        title="Luxury Properties in Noida"
        description="Explore premium residential and commercial real estate projects by Lotusss in Noida. Luxury apartments, villas, plots and office spaces on the Noida Expressway."
        url="/"
      />
      <HeroSection />
      <WelcomeSection />
      <PropertyTypes />
      <WhyChooseUs />
      <OurProjects />
      <Gallery />
      <Testimonials />
      <RecentBlogs />
      <ContactSection />
    </>
  );
}
