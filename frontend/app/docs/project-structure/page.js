import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import DocsSidebar from "../../../components/DocsSidebar";
import CodeBlock from "../../../components/CodeBlock";

export default function ProjectStructurePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="mx-auto flex max-w-7xl">
        <DocsSidebar />

        <article className="min-w-0 flex-1 px-6 py-12 md:px-12">
          <div className="max-w-3xl">
            <p className="text-sm text-blue-400">
              Project
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Project Structure
            </h1>

            <p className="mt-5 leading-7 text-slate-400">
              Faiz Generator creates a clean and scalable
              backend architecture.
            </p>

            <CodeBlock>
{`src/
├── config/
├── constants/
├── controllers/
├── db/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── types/
├── utils/
└── validations/

prisma/
└── schema.prisma

tests/
uploads/
logs/

.env.example
.gitignore
package.json
README.md`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Controllers
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Controllers handle incoming HTTP requests
              and send responses.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">
              Services
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Business logic is kept inside services so
              the application remains maintainable.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">
              Repositories
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Database access and queries are separated
              from the business logic.
            </p>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}