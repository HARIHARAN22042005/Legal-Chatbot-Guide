"use client"

import { motion } from "framer-motion"
import ProjectTile from "@/components/ui/project-tile"

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Digital Cookbook",
      description:
        "A comprehensive recipe sharing platform with advanced search, filtering, user authentication, and personal recipe collections. Features include meal planning and nutritional information.",
      tech: "Next.js 15, Tailwind CSS, TypeScript",
      image: "/placeholder.svg?height=600&width=800",
      links: {
        demo: "#",
        github: "#",
      },
      completed: true,
    },
    {
      id: 2,
      title: "Interactive Portfolio Dashboard",
      description:
        "A dynamic dashboard showcasing projects, skills, and analytics with beautiful data visualizations and real-time updates.",
      tech: "React, D3.js, Framer Motion",
      image: "/placeholder.svg?height=600&width=800",
      links: {
        demo: "",
        github: "",
      },
      completed: false,
    },
    {
      id: 3,
      title: "AI-Powered Content Studio",
      description:
        "An intelligent content creation tool that leverages AI to generate web content, design suggestions, and code snippets for developers.",
      tech: "Next.js, OpenAI API, Tailwind CSS",
      image: "/placeholder.svg?height=600&width=800",
      links: {
        demo: "",
        github: "",
      },
      completed: false,
    },
  ]

  return (
    <section id="projects" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          A showcase of my recent work and creative solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectTile key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Background elements */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-cyan-500/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full filter blur-3xl -z-10"></div>
    </section>
  )
}
