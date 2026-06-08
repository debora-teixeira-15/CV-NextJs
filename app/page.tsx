import Education from "./components/pages/Education";
import Header from "./components/pages/Header";
import WorkExperience from "./components/pages/WorkExperience";
import Certifications from "./components/pages/Certifications";
import TechStack from "./components/pages/TechStack";
import Navbar from "./components/general/Navbar";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <div id="home" className="sticky top-0 h-full bg-stone-50 font-sans">
        <Header />
      </div>
      <div className="relative bg-stone-50 font-sans">
        <div id="experience" data-path="/#experience">
          <WorkExperience />
        </div>
        <div
          id="education"
          data-path="/#education"
          className="flex w-full justify-center pt-30 pb-20 gap-40 h-[75vh]"
        >
          <Education />
          <Certifications />
        </div>
        <div id="tech-stack" data-path="/#tech-stack">
          <TechStack />
        </div>
      </div>
    </div>
  );
}
