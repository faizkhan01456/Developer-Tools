import Link from "next/link";

const sections = [
  {
    title: "GETTING STARTED",
    items: [
      {
        label: "Introduction",
        href: "/docs",
      },
      {
        label: "Installation",
        href: "/docs/installation",
      },
    ],
  },
  {
    title: "CLI",
    items: [
      {
        label: "Create Project",
        href: "/docs/cli",
      },
    ],
  },
  {
    title: "CONFIGURATION",
    items: [
      {
        label: "Configuration",
        href: "/docs/configuration",
      },
    ],
  },
  {
    title: "PROJECT",
    items: [
      {
        label: "Project Structure",
        href: "/docs/project-structure",
      },
    ],
  },
];

export default function DocsSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 px-6 py-10 lg:block">
      <div className="sticky top-24">
        <div className="mb-6 text-sm font-semibold text-white">
          Documentation
        </div>

        <div className="space-y-7">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="mb-3 text-xs font-semibold tracking-wider text-slate-600">
                {section.title}
              </div>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}