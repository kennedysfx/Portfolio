import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About"; // Fixed path here!
import Project from "@/app/components/Projects"; 
import TechStack from "@/app/components/TechStack";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";




export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <Hero />
      <About />
      <Project />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}