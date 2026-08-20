import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import DocsSidebar from "../../../components/DocsSidebar";
import CodeBlock from "../../../components/CodeBlock";

export default function CliPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="mx-auto flex max-w-7xl">
        <DocsSidebar />

        <article className="min-w-0 flex-1 px-6 py-12 md:px-12">
          <div className="max-w-3xl">
            <p className="text-sm text-blue-400">
              CLI
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Create a Backend
            </h1>

            <p className="mt-5 leading-7 text-slate-400">
              Create a production-ready Node.js backend
              project using one command.
            </p>

            <CodeBlock>
              npx create-faiz-backend my-project
            </CodeBlock>

            <h2 className="mt-12 text-2xl font-semibold">
              Default Stack
            </h2>

            <div className="mt-5 overflow-hidden rounded-xl border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="px-5 py-4">
                      Technology
                    </th>

                    <th className="px-5 py-4">
                      Default
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="px-5 py-4 text-slate-400">
                      Backend
                    </td>

                    <td className="px-5 py-4">
                      Node.js + Express
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 text-slate-400">
                      Database
                    </td>

                    <td className="px-5 py-4">
                      MySQL
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 text-slate-400">
                      ORM
                    </td>

                    <td className="px-5 py-4">
                      Prisma
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 text-slate-400">
                      Authentication
                    </td>

                    <td className="px-5 py-4">
                      JWT
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 text-slate-400">
                      Validation
                    </td>

                    <td className="px-5 py-4">
                      Zod
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-2xl font-semibold">
              Generated Project
            </h2>

            <CodeBlock>
{`my-project/
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── validations/
│
├── prisma/
│   └── schema.prisma
│
├── tests/
├── uploads/
├── logs/
├── .env.example
├── .gitignore
├── package.json
└── README.md`}
            </CodeBlock>

            <h2 className="mt-12 text-2xl font-semibold">
              Start the project
            </h2>

            <CodeBlock>
{`cd my-project
copy .env.example .env
npx prisma generate
npm run dev`}
            </CodeBlock>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}