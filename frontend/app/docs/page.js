import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DocsSidebar from "../../components/DocsSidebar";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="mx-auto flex max-w-7xl">
        <DocsSidebar />

        <article className="min-w-0 flex-1 px-6 py-12 md:px-12">
          <div className="max-w-3xl">
            <div className="mb-4 text-sm text-blue-400">
              Documentation
            </div>

            <h1 className="text-4xl font-bold">
              Faiz Generator Documentation
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Learn how to install, configure and use
              Faiz Generator to create professional
              Node.js backend projects.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <a
                href="/docs/installation"
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
              >
                <h2 className="text-lg font-semibold">
                  Installation
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Install and run Faiz Generator.
                </p>
              </a>

              <a
                href="/docs/cli"
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
              >
                <h2 className="text-lg font-semibold">
                  CLI
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Learn the create-faiz-backend command.
                </p>
              </a>

              <a
                href="/docs/configuration"
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
              >
                <h2 className="text-lg font-semibold">
                  Configuration
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Understand database, Prisma and environment
                  configuration.
                </p>
              </a>

              <a
                href="/docs/project-structure"
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
              >
                <h2 className="text-lg font-semibold">
                  Project Structure
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Explore the generated backend structure.
                </p>
              </a>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}