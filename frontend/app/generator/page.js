import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GeneratorForm from "../../components/GeneratorForm";

export default function GeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
              Backend Generator
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Create Your Backend
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Configure your backend stack and generate a
              professional project structure automatically.
            </p>
          </div>

          <GeneratorForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}