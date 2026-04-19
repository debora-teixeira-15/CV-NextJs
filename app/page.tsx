import Education from "./components/pages/Education";
import Header from "./components/pages/Header";
import WorkExperience from "./components/pages/WorkExperience";
import Certifications from "./components/pages/Certifications";

export default function Home() {
  return (
    <div className="relative">
      <div className="sticky top-0 h-[70vh] bg-stone-50 font-sans">
        <Header />
      </div>
      <div className="relative bg-stone-50 font-sans">
        <WorkExperience />
        <Education />
        <Certifications />
      </div>
    </div>
  );
}
