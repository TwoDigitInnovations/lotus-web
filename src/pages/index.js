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
