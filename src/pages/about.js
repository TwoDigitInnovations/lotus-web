import { useEffect } from "react";
import SEO from "@/components/SEO";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import Commitments from "@/components/Commitments";
import Leaders from "@/components/Leaders";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutPage } from "@/store/slices/aboutSlice";

export default function AboutPage() {
  const dispatch = useDispatch();
  const { data: aboutData, fetched } = useSelector((s) => s.about);

  useEffect(() => {
    if (!fetched) dispatch(fetchAboutPage());
  }, []);

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Lotusss Real Estate — over 15 years of experience delivering premium homes in Noida. Meet our leadership team and discover our commitment to quality."
        url="/about"
      />
      <AboutHero data={aboutData?.hero} />
      <AboutStory data={aboutData?.story} />
      <Commitments data={aboutData?.commitments} />
      <Leaders data={aboutData?.leaders} />
    </>
  );
}
