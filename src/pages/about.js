import { useEffect } from "react";
import SEO from "@/components/SEO";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import Commitments from "@/components/Commitments";
import Leaders from "@/components/Leaders";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutPage } from "@/store/slices/aboutSlice";
import {
  aboutHero as defaultHero,
  aboutStory as defaultStory,
  commitments as defaultCommitments,
  leaders as defaultLeaders,
} from "@/data/aboutData";

export default function AboutPage() {
  const dispatch = useDispatch();
  const { data: aboutData, fetched } = useSelector((s) => s.about);

  useEffect(() => {
    if (!fetched) dispatch(fetchAboutPage());
  }, []);

  const heroData = aboutData?.hero?.heading ? aboutData.hero : defaultHero;
  const storyData = aboutData?.story?.description ? aboutData.story : defaultStory;
  const commitmentsData = aboutData?.commitments?.length ? aboutData.commitments : defaultCommitments;
  const leadersData = aboutData?.leaders?.length ? aboutData.leaders : defaultLeaders;

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Lotusss Real Estate — over 15 years of experience delivering premium homes in Noida. Meet our leadership team and discover our commitment to quality."
        url="/about"
      />
      <AboutHero data={heroData} />
      <AboutStory data={storyData} fetched={fetched} />
      <Commitments data={commitmentsData} fetched={fetched} />
      <Leaders data={leadersData} fetched={fetched} />
    </>
  );
}
