"use client";

import { useState } from "react";

export default function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(
        String(children)
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative mt-5 overflow-hidden rounded-xl border border-slate-800 bg-black">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <span className="text-xs text-slate-600">
          Terminal
        </span>

        <button
          type="button"
          onClick={copyCode}
          className="rounded-md border border-slate-700 px-3 py-1 text-xs text-slate-400 transition hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}