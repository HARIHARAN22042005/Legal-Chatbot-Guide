"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import SkillButton from "@/components/ui/skill-button"

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend")

  const categories = [
    { id: "frontend", label: "Frontend" },
    { id: "styling", label: "Styling" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "Tools" },
    { id: "soft", label: "Soft Skills" },
  ]

  const skills = {
    frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"],
    styling: ["Tailwind CSS", "Bootstrap", "Sass", "Styled Components"],
    backend: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"],
    tools: ["Git", "VS Code", "Figma", "Docker"],
    soft: ["Teamwork", "Problem-Solving", "Time Management", "Communication"],
  }

  return (
    <section id="skills" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Technologies and tools I use to bring ideas to life
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            viewport={{ once: true }}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/20"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills[activeCategory as keyof typeof skills].map((skill, index) => (
          <SkillButton key={skill} skill={skill} index={index} />
        ))}
      </div>

      {/* Background elements */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl -z-10"></div>
    </section>
  )
}
