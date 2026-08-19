export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold">
            F
          </div>

          <div>
            <h1 className="font-semibold">
              Faiz Generator
            </h1>

            <p className="text-xs text-slate-500">
              Developer Tools
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-400">
          Next.js
        </div>
      </div>
    </header>
  );
}