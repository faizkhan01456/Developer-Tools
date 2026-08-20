const STEPS = [
  {
    number: "01",
    title: "Configure",
    description:
      "Choose your project name, database, ORM and features.",
  },
  {
    number: "02",
    title: "Generate",
    description:
      "Faiz Generator creates the backend structure automatically.",
  },
  {
    number: "03",
    title: "Start Coding",
    description:
      "Install dependencies, configure your environment and start building.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm text-blue-400">
            HOW IT WORKS
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            From idea to backend
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-slate-800 bg-slate-900 p-7"
            >
              <div className="text-5xl font-bold text-blue-600/30">
                {step.number}
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}