import Education from "./components/pages/Education";
import Header from "./components/pages/Header";
import WorkExperience from "./components/pages/WorkExperience";
import Certifications from "./components/pages/Certifications";
import TechStack from "./components/pages/TechStack";

export default function Home() {
  return (
    <div className="relative">
      <div className="sticky top-0 h-full bg-stone-50 font-sans">
        <Header />
      </div>
      <div className="relative bg-stone-50 font-sans">
        <WorkExperience />
        <div className="flex w-full justify-center pt-30 pb-20 gap-40 h-[75vh]">
          <Education />
          <Certifications />
        </div>
        <TechStack />
      </div>
    </div>
  );
}
