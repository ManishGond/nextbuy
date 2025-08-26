import AuthButtons from "@/components/AuthButtons";

export default function Home() {
  return (
    <main className="flex flex-col gap-10 min-h-screen items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">🚀 NextBuy</h1>
      <AuthButtons />
    </main>
  );
}
