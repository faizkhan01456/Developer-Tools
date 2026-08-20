import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 text-sm text-blue-400">
            About Faiz Generator
          </div>

          <h1 className="text-4xl font-bold md:text-6xl">
            Build backend projects faster.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Faiz Generator is a developer tool designed
            to remove repetitive backend setup work and
            help developers start building features faster.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="text-3xl">⚡</div>

              <h2 className="mt-4 font-semibold">
                Fast
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Generate your project structure in seconds.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="text-3xl">🧱</div>

              <h2 className="mt-4 font-semibold">
                Structured
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Start with a clean backend architecture.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="text-3xl">🚀</div>

              <h2 className="mt-4 font-semibold">
                Developer First
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Focus on your application instead of setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}