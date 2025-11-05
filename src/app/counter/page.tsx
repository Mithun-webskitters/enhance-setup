import Counter from "../components/Counter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Zustand + Next.js + TS</h1>
      <Counter />
    </main>
  );
}
