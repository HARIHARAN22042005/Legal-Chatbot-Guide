"use client"

import { motion } from "framer-motion"
import { ExternalLink, Clock, Star, Calendar, Code2 } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  links: {
    demo: string
    github: string
  }
  completed: boolean
  featured?: boolean
  date?: string
  status?: "completed" | "in-progress" | "planned"
}

interface ProjectTileProps {
  project: Project
  index: number
}

export default function ProjectTile({ project, index }: ProjectTileProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "in-progress":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "planned":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "planned":
        return "Planned"
      default:
        return "Coming Soon"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-1 px-3 rounded-full flex items-center text-xs font-medium shadow-lg">
          <Star className="h-3 w-3 mr-1 fill-current" />
          Featured
        </div>
      )}

      {/* Status Badge */}
      <div className={`absolute top-4 right-4 z-10 py-1 px-3 rounded-full flex items-center text-xs font-medium border ${getStatusColor(project.status || "planned")}`}>
        <Clock className="h-3 w-3 mr-1" />
        {getStatusText(project.status || "planned")}
      </div>

      <div className="relative h-52 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 space-y-4">
        {/* Title and Date */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          {project.date && (
            <div className="flex items-center text-xs text-gray-400 ml-2">
              <Calendar className="h-3 w-3 mr-1" />
              {project.date}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-400">
            <Code2 className="h-3 w-3 mr-1" />
            Technologies:
          </div>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(project.tech) ? (
              project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md border border-purple-500/30"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md border border-purple-500/30">
                {project.tech}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {project.completed || project.status === "completed" ? (
            <>
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm text-white bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </motion.a>
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-lg"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Source Code
              </motion.a>
            </>
          ) : (
            <div className="flex items-center text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              {project.status === "in-progress" ? "Development in progress..." : "Coming soon..."}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Hover Effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-20"></div>
    </motion.div>
  )
}
