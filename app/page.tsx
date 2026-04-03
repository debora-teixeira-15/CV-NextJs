import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-zinc-50 font-sans">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        {/* conteúdo principal aqui */}
      </main>
    </div>
  );
}
