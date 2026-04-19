import Education from "./components/Education";
import Header from "./components/Header";
import WorkExperience from "./components/WorkExperience";
import Certifications from "./components/Certifications";

export default function Home() {
  return (
    <div className="relative">
      <div className="sticky top-0 h-[70vh] bg-stone-50 font-sans">
        <Header />
      </div>
      <div className="relative bg-stone-50 font-sans">
        <Education />
        <WorkExperience />
        <Certifications />
      </div>
    </div>
  );
}
