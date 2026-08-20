"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/generator", label: "Generator" },
    { href: "/docs", label: "Docs" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Main Floating Navbar */}
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/50 px-4 py-3 shadow-2xl backdrop-blur-lg">
          
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white transition-transform group-hover:scale-105 group-active:scale-95">
              F
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-sm font-bold tracking-tight text-transparent">
                Faiz Generator
              </span>
              <span className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">
                Dev Tools
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/5 p-1 border border-white/5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-neutral-300 transition-all hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 md:flex">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              GitHub
            </a>

            <Link
              href="/generator"
              className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="mt-2 overflow-hidden rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="my-2 h-px w-full bg-white/10" />
              
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                GitHub
              </a>

              <Link
                href="/generator"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-black transition-colors hover:bg-neutral-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}