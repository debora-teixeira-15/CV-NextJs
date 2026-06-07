import { techStack } from "../../data/TechStackData";

export default function TechStack() {
  return (
    <section className="relative py-15 w-full bg-zinc-800 overflow-hidden">
      <p className="text-4xl font-light tracking-[0.2em] text-white/80 pb-10 text-center">
        TECH STACK
      </p>
      <div className="grid grid-cols-4 gap-20 max-w-5xl mx-auto px-10 py-10">
        {techStack.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <Icon className="text-white/80 w-16 h-16 text-6xl" />
            <span className="text-white/70 text-center text-sm tracking-widest">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
