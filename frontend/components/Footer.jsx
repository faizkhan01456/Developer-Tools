import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">

        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
              F
            </div>

            <span className="font-semibold">
              Faiz Generator
            </span>
          </div>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
            Developer tools for creating professional
            backend projects faster.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            Product
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
            <Link href="/generator">
              Generator
            </Link>

            <Link href="/docs">
              Documentation
            </Link>

            <Link href="/about">
              About
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">
            Resources
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
            <Link href="/docs/installation">
              Installation
            </Link>

            <Link href="/docs/cli">
              CLI
            </Link>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-600">
        © 2026 Faiz Generator. Built for developers.
      </div>
    </footer>
  );
}