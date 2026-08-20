import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import DocsSidebar from "../../../components/DocsSidebar";
import CodeBlock from "../../../components/CodeBlock";

export default function InstallationPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="mx-auto flex max-w-7xl">
        <DocsSidebar />

        <article className="min-w-0 flex-1 px-6 py-12 md:px-12">
          <div className="max-w-3xl">
            <p className="text-sm text-blue-400">
              Getting Started
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Installation
            </h1>

            <p className="mt-5 leading-7 text-slate-400">
              Faiz Generator is distributed through npm.
              You can create a backend project directly
              using npx.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">
              Requirements
            </h2>

            <ul className="mt-4 space-y-2 text-slate-400">
              <li>• Node.js 18 or newer</li>
              <li>• npm</li>
              <li>• MySQL for the default database</li>
            </ul>

            <h2 className="mt-10 text-2xl font-semibold">
              Create a project
            </h2>

            <p className="mt-4 text-slate-400">
              Run the following command:
            </p>

            <CodeBlock>
              npx create-faiz-backend my-project
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Enter the project
            </h2>

            <CodeBlock>
              cd my-project
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Start development
            </h2>

            <CodeBlock>
              npm install{"\n"}
              npm run dev
            </CodeBlock>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}