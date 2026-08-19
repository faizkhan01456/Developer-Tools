"use client";

import { useState } from "react";

const DATABASES = [
  {
    value: "mysql",
    label: "MySQL"
  },
  {
    value: "postgresql",
    label: "PostgreSQL"
  },
  {
    value: "mongodb",
    label: "MongoDB"
  },
  {
    value: "sqlite",
    label: "SQLite"
  }
];

const ORMS = [
  {
    value: "prisma",
    label: "Prisma"
  },
  {
    value: "drizzle",
    label: "Drizzle"
  }
];

export default function GeneratorForm() {
  const [projectName, setProjectName] = useState("");

  const [database, setDatabase] = useState("mysql");

  const [orm, setOrm] = useState("prisma");

  const [authentication, setAuthentication] = useState(true);

  const [validation, setValidation] = useState(true);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const isMongoWithDrizzle =
    database === "mongodb" && orm === "drizzle";

  function handleDatabaseChange(value) {
    setDatabase(value);

    // MongoDB is not supported by Drizzle
    if (value === "mongodb") {
      setOrm("prisma");
    }
  }

  async function generateProject(e) {
    e.preventDefault();

    if (!projectName.trim()) {
      setResult({
        success: false,
        message: "Please enter project name."
      });

      return;
    }

    if (isMongoWithDrizzle) {
      setResult({
        success: false,
        message:
          "Drizzle does not support MongoDB. Please select Prisma."
      });

      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectName,
          database,
          orm,
          authentication,
          validation
        })
      });

      const data = await response.json();

      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message:
          error.message ||
          "Something went wrong."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">
          Create New Backend
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Configure your backend and generate it automatically.
        </p>
      </div>

      <form
        onSubmit={generateProject}
        className="space-y-6"
      >

        {/* Project Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Project Name
          </label>

          <input
            type="text"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            placeholder="my-backend"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Backend */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Backend
          </label>

          <div className="rounded-xl border border-blue-600/50 bg-blue-600/10 p-4">
            <div className="font-medium">
              Node.js + Express
            </div>

            <div className="mt-1 text-sm text-slate-400">
              Professional backend structure
            </div>
          </div>
        </div>

        {/* Database */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Database
          </label>

          <select
            value={database}
            onChange={(e) =>
              handleDatabaseChange(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          >
            {DATABASES.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* ORM */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            ORM
          </label>

          <select
            value={orm}
            onChange={(e) =>
              setOrm(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          >
            {ORMS.map((item) => {
              const disabled =
                database === "mongodb" &&
                item.value === "drizzle";

              return (
                <option
                  key={item.value}
                  value={item.value}
                  disabled={disabled}
                >
                  {item.label}
                  {disabled
                    ? " (Not supported with MongoDB)"
                    : ""}
                </option>
              );
            })}
          </select>
        </div>

        {/* MongoDB Warning */}

        {isMongoWithDrizzle && (
          <div className="rounded-xl border border-yellow-700 bg-yellow-950/30 p-4 text-sm text-yellow-300">
            MongoDB is not supported by Drizzle.
            Please select Prisma.
          </div>
        )}

        {/* Features */}

        <div className="grid gap-4 md:grid-cols-2">

          {/* Authentication */}

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">

            <input
              type="checkbox"
              checked={authentication}
              onChange={(e) =>
                setAuthentication(
                  e.target.checked
                )
              }
              className="h-4 w-4"
            />

            <div>
              <div className="font-medium">
                JWT Authentication
              </div>

              <div className="text-xs text-slate-500">
                Add authentication utilities
              </div>
            </div>

          </label>

          {/* Validation */}

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">

            <input
              type="checkbox"
              checked={validation}
              onChange={(e) =>
                setValidation(
                  e.target.checked
                )
              }
              className="h-4 w-4"
            />

            <div>
              <div className="font-medium">
                Zod Validation
              </div>

              <div className="text-xs text-slate-500">
                Add validation utilities
              </div>
            </div>

          </label>

        </div>

        {/* Generate */}

        <button
          type="submit"
          disabled={
            loading ||
            isMongoWithDrizzle
          }
          className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "⚡ Generate Project"}
        </button>

      </form>

      {/* Result */}

      {result && (
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
            <div className="mt-3 rounded-lg bg-black/30 p-3 font-mono text-sm">
              {result.path}
            </div>
          )}

        </div>
      )}

    </div>
  );
}