import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteSettings } from "@/store/slices/siteSettingsSlice";
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
  const dispatch = useDispatch();
  const { welcome, fetched } = useSelector((s) => s.siteSettings);

  useEffect(() => {
    if (!fetched) dispatch(fetchSiteSettings());
  }, [fetched, dispatch]);

  const metaTitle = welcome?.metaTitle || "Luxury Properties in Noida";
  const metaDesc = welcome?.metaDescription || "Explore premium residential and commercial real estate projects by Lotusss in Noida. Luxury apartments, villas, plots and office spaces on the Noida Expressway.";

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDesc}
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
