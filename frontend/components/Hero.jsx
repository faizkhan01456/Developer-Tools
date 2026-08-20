"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles = [];
    let mouseX = null;
    let mouseY = null;

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }

      draw() {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }

    // Draw connecting lines
    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            // Check mouse proximity
            let mouseInfluence = 1;
            if (mouseX !== null && mouseY !== null) {
              const dxMouse = particles[i].x - mouseX;
              const dyMouse = particles[i].y - mouseY;
              const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
              if (mouseDist < 150) {
                mouseInfluence = 1 - mouseDist / 150;
              }
            }

            const opacity = (1 - distance / 150) * 0.3 * mouseInfluence;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connecting lines
      drawLines();

      requestAnimationFrame(animate);
    }

    animate();

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float-up {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
        .animate-data-stream {
          animation: float-up linear infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease-in-out infinite;
        }
      `}} />

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 py-24 md:py-32">
        
        {/* --- ENHANCED ANIMATED BACKGROUND LAYER --- */}
        
        {/* 0. Canvas Particle Network */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full"
        />
        
        {/* 1. Pixel Grid with animated opacity */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80 animate-pulse-ring" />

        {/* 2. Swirling Cosmic Nebulae (Blobs) with enhanced colors */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-70 mix-blend-screen">
          <div className="animate-blob absolute top-0 -left-4 h-96 w-96 rounded-full bg-indigo-600/50 blur-[120px] mix-blend-screen" />
          <div className="animate-blob animation-delay-2000 absolute top-0 -right-4 h-96 w-96 rounded-full bg-purple-600/50 blur-[120px] mix-blend-screen" />
          <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-96 w-96 rounded-full bg-blue-600/50 blur-[120px] mix-blend-screen" />
          <div className="animate-blob animation-delay-1000 absolute bottom-0 right-20 h-64 w-64 rounded-full bg-pink-600/30 blur-[100px] mix-blend-screen" />
        </div>

        {/* 3. Digital Data Streams with varying colors */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="animate-data-stream absolute h-32 w-[2px] bg-gradient-to-t from-transparent via-indigo-400 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 4}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.3,
                height: `${Math.random() * 50 + 20}px`,
              }}
            />
          ))}
        </div>

        {/* 4. Floating glitch particles */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={`glitch-${i}`}
              className="absolute h-[1px] w-[1px] rounded-full bg-indigo-400/60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 1}s`,
                boxShadow: `0 0 10px rgba(139, 92, 246, 0.5)`,
              }}
            />
          ))}
        </div>

        {/* 5. Gradient orb in background */}
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] -z-20 rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl animate-gradient-shift" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] -z-20 rounded-full bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl animate-gradient-shift" />
        
        {/* ------------------------------- */}

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Subtle Pill Badge with enhanced animation */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-neutral-300 shadow-lg backdrop-blur-md hover:border-indigo-500/30 transition-all duration-300">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]"></span>
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient-shift">
              Developer Project Generator
            </span>
          </div>

          {/* Hero Title with enhanced gradient animation */}
          <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-700 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
            Build Your Backend <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm bg-[length:200%_200%] animate-gradient-shift">
              In Seconds
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-in fade-in slide-in-from-bottom-8 duration-700 mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Generate a clean, scalable Node.js backend structure with Express, MySQL, Prisma, JWT, and Zod instantly. Stop rewriting boilerplate.
          </p>

          {/* Call to Actions with hover effects */}
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/generator"
              className="group relative flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
            >
              <span>Generate Backend</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>

            <Link
              href="/docs"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95"
            >
              Read Documentation
            </Link>
          </div>

          {/* Terminal Mockup with enhanced visual effects */}
          <div className="relative mx-auto mt-20 max-w-3xl animate-in fade-in zoom-in-95 duration-1000">
            {/* Glow effect behind terminal */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl animate-pulse-ring" />
            
            {/* Terminal Window */}
            <div className="relative z-10 rounded-2xl border border-white/10 bg-[#09090b]/80 p-6 text-left shadow-2xl backdrop-blur-xl hover:border-indigo-500/30 transition-all duration-500">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.4)] hover:shadow-[0_0_12px_rgba(244,63,94,0.6)] transition-shadow" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)] hover:shadow-[0_0_12px_rgba(245,158,11,0.6)] transition-shadow" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)] hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] transition-shadow" />
                </div>
                <div className="text-xs font-mono text-neutral-500">bash</div>
                <div className="w-12"></div>
              </div>

              <div className="font-mono text-sm leading-relaxed md:text-base">
                <span className="text-pink-500">~</span>{" "}
                <span className="text-neutral-300">❯</span>{" "}
                <span className="text-indigo-400 hover:text-indigo-300 transition-colors">npx</span>{" "}
                <span className="text-white hover:text-neutral-200 transition-colors">create-faiz-backend@latest</span>{" "}
                <span className="text-purple-400 hover:text-purple-300 transition-colors">my-project</span>
                
                <div className="mt-4 flex items-center gap-2 text-neutral-500">
                  <span className="animate-spin text-indigo-400">⠋</span>{" "}
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift">
                    Bootstrapping scalable architecture...
                  </span>
                </div>

                {/* Animated progress bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-shift" 
                       style={{ width: '60%' }} />
                </div>
              </div>
            </div>
            
            {/* Enhanced Floor Reflection Effect */}
            <div className="absolute -bottom-12 left-10 right-10 -z-10 h-32 scale-y-[-1] rounded-2xl bg-gradient-to-t from-indigo-500/10 via-purple-500/10 to-transparent opacity-20 blur-sm"></div>
          </div>
        </div>
      </section>
    </>
  );
}