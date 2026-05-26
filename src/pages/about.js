import AboutHero from "@/components/AboutHero";

import AboutStory from "@/components/AboutStory";
import Commitments from "@/components/Commitments";
import Leaders from "@/components/Leaders";
import WelcomeSection from "@/components/WelcomeSection";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WelcomeSection />
      <AboutStory />
      <Commitments />
      <Leaders />
    </>
  );
}
