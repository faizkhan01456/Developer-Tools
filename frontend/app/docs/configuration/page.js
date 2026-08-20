import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import DocsSidebar from "../../../components/DocsSidebar";
import CodeBlock from "../../../components/CodeBlock";

export default function ConfigurationPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="mx-auto flex max-w-7xl">
        <DocsSidebar />

        <article className="min-w-0 flex-1 px-6 py-12 md:px-12">
          <div className="max-w-3xl">
            <p className="text-sm text-blue-400">
              Configuration
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Configuration
            </h1>

            <p className="mt-5 leading-7 text-slate-400">
              The default generated backend uses MySQL
              with Prisma.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">
              Environment
            </h2>

            <CodeBlock>
{`PORT=5000
DATABASE_URL="mysql://root:password@localhost:3306/my_database"
JWT_SECRET="change_this_secret"
NODE_ENV="development"`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Prisma
            </h2>

            <CodeBlock>
{`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Generate Prisma Client
            </h2>

            <CodeBlock>
              npx prisma generate
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Database Migration
            </h2>

            <CodeBlock>
              npx prisma migrate dev
            </CodeBlock>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}