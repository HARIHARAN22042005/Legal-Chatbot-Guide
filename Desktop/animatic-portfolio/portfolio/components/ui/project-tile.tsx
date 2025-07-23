"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Clock } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  tech: string
  image: string
  links: {
    demo: string
    github: string
  }
  completed: boolean
}

interface ProjectTileProps {
  project: Project
  index: number
}

export default function ProjectTile({ project, index }: ProjectTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

        {!project.completed && (
          <div className="absolute top-4 right-4 bg-gray-900/80 text-yellow-400 py-1 px-3 rounded-full flex items-center text-xs font-medium">
            <Clock className="h-3 w-3 mr-1" />
            Coming Soon
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-cyan-400">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4">{project.description}</p>

        <div className="mb-4">
          <p className="text-xs text-gray-400">Technologies:</p>
          <p className="text-sm text-purple-400">{project.tech}</p>
        </div>

        <div className="flex gap-3">
          {project.completed ? (
            <>
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-white bg-gradient-to-r from-cyan-500 to-cyan-700 px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Demo
              </a>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-white bg-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-600 transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            </>
          ) : (
            <span className="text-sm text-gray-400">Links will be available when completed</span>
          )}
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  )
}
