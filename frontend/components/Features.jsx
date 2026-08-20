const FEATURES = [
  {
    icon: "⚡",
    title: "Fast Generation",
    description: "Create your backend structure in seconds.",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "group-hover:border-orange-500/50",
  },
  {
    icon: "🗄️",
    title: "MySQL + Prisma",
    description: "Start with a production-friendly database setup.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-cyan-500/50",
  },
  {
    icon: "🔐",
    title: "JWT Authentication",
    description: "Authentication utilities are ready when you need them.",
    gradient: "from-emerald-500/20 to-green-500/20",
    border: "group-hover:border-emerald-500/50",
  },
  {
    icon: "✅",
    title: "Zod Validation",
    description: "Keep incoming requests validated and predictable.",
    gradient: "from-rose-500/20 to-pink-500/20",
    border: "group-hover:border-pink-500/50",
  },
  {
    icon: "📁",
    title: "Clean Architecture",
    description: "Controllers, services, repositories and routes are organized.",
    gradient: "from-indigo-500/20 to-blue-500/20",
    border: "group-hover:border-indigo-500/50",
  },
  {
    icon: "🚀",
    title: "Developer Focused",
    description: "Spend less time creating boilerplate and more time building.",
    gradient: "from-purple-500/20 to-fuchsia-500/20",
    border: "group-hover:border-purple-500/50",
  },
];

export default function Features() {
  return (
    <section className="relative w-full bg-transparent px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-sm font-bold tracking-wider text-transparent uppercase">
            Powerful Features
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-white md:text-5xl">
            Everything you need to start
          </h2>

          <p className="mt-6 text-lg text-neutral-400">
            A clean, production-ready foundation for your next backend project. 
            Batteries included, but fully customizable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={`group relative rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl ${feature.border}`}
            >
              {/* Icon Container */}
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} border border-white/10 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                {feature.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-white transition-colors">
                {feature.title}
              </h3>

              <p className="mt-3 leading-relaxed text-neutral-400">
                {feature.description}
              </p>
              
              {/* Subtle hover glow effect inside the card */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-white/0 to-white/0 transition-colors duration-300 group-hover:from-white/5 group-hover:to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}