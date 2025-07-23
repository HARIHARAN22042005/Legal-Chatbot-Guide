import type { Metadata } from "next"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Timeline from "@/components/sections/timeline"
import Achievements from "@/components/sections/achievements"
import Contact from "@/components/sections/contact"
import CursorEffect from "@/components/ui/cursor-effect"
import Navigation from "@/components/ui/navigation"

export const metadata: Metadata = {
  title: "Hariharan S | Full Stack Developer & Creative Technologist",
  description: "Portfolio of Hariharan S - Full Stack Developer, Creative Thinker, and Future Tech Architect",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden relative">
      <CursorEffect />
      <Navigation />

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Achievements />
        <Contact />
      </div>
    </main>
  )
}
