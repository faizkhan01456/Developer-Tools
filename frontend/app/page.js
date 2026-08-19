import Header from "../components/Header";
import GeneratorForm from "../components/GeneratorForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
             Developer Project Generator
          </div>

          <h1 className="text-5xl font-bold tracking-tight">
            Build Your Backend
            <span className="block text-blue-500">
              In Seconds
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-400">
            Generate a professional Node.js backend structure
            with one click.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <GeneratorForm />
        </div>
      </section>
    </main>
  );
}