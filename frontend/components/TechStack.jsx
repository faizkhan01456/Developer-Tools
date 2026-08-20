const STACK = [
  "Node.js",
  "Express",
  "MySQL",
  "Prisma",
  "JWT",
  "Zod",
];

export default function TechStack() {
  return (
    <section className="border-t border-slate-900 px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm text-blue-400">
          DEFAULT STACK
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Built with proven technologies
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
          The default CLI command generates a Node.js
          + Express backend using MySQL and Prisma.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {STACK.map((technology) => (
            <div
              key={technology}
              className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-3 text-sm text-slate-300"
            >
              {technology}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}