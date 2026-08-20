export default function ProjectResult({
  result,
}) {
  if (!result) {
    return null;
  }

  return (
    <div
      className={`mt-6 rounded-xl border p-5 ${
        result.success
          ? "border-green-800 bg-green-950/30"
          : "border-red-800 bg-red-950/30"
      }`}
    >
      <h3 className="font-semibold">
        {result.success
          ? "🎉 Project Created"
          : "❌ Generation Failed"}
      </h3>

      <p className="mt-2 text-sm text-slate-300">
        {result.message}
      </p>

      {result.database && (
        <p className="mt-2 text-sm text-slate-400">
          Database:{" "}
          <span className="text-white">
            {result.database}
          </span>
        </p>
      )}

      {result.orm && (
        <p className="text-sm text-slate-400">
          ORM:{" "}
          <span className="text-white">
            {result.orm}
          </span>
        </p>
      )}

      {result.path && (
        <div className="mt-3 break-all rounded-lg bg-black/30 p-3 font-mono text-sm text-slate-300">
          {result.path}
        </div>
      )}
    </div>
  );
}