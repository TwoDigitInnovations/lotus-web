import { useState, useEffect } from "react";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import Commitments from "@/components/Commitments";
import Leaders from "@/components/Leaders";
import WelcomeSection from "@/components/WelcomeSection";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.lotusssinfra.com/";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    axios.get(`${API}about-page`).then((res) => {
      if (res.data?.data) setAboutData(res.data.data);
    }).catch(() => {});
  }, []);

  return (
    <>
      <AboutHero data={aboutData?.hero} />
      <WelcomeSection />
      <AboutStory data={aboutData?.story} />
      <Commitments data={aboutData?.commitments} />
      <Leaders data={aboutData?.leaders} />
    </>
  );
}
