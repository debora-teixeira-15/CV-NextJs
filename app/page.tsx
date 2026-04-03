import Education from "./components/Education";
import Header from "./components/Header";
import WorkExperience from "./components/WorkExperience";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-stone-50 font-sans">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-between px-1 sm:items-start">
        <Education />
        <WorkExperience />
      </main>
    </div>
  );
}
