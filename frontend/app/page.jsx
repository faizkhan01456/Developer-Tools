import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import TechStack from "../components/TechStack";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <Hero />

      <Features />

      <HowItWorks />

      <TechStack />

      <Footer />
    </main>
  );
}