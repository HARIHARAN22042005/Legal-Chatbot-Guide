"use client"

import { motion } from "framer-motion"
import { Code, FileCode, Atom, Rocket, Sparkles } from "lucide-react"

interface TimelineEvent {
  year: string
  title: string
  description: string
  icon: string
}

interface TimelineItemProps {
  event: TimelineEvent
  index: number
  isLeft: boolean
}

export default function TimelineItem({ event, index, isLeft }: TimelineItemProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="h-5 w-5" />
      case "FileCode":
        return <FileCode className="h-5 w-5" />
      case "Atom":
        return <Atom className="h-5 w-5" />
      case "Rocket":
        return <Rocket className="h-5 w-5" />
      case "Sparkles":
        return <Sparkles className="h-5 w-5" />
      default:
        return <Code className="h-5 w-5" />
    }
  }

  return (
    <div className="mb-12 md:mb-16 relative">
      <div className={`flex flex-col md:flex-row items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          viewport={{ once: true }}
          className={`w-full md:w-5/12 ${isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}
        >
          <div
            className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 ${
              isLeft ? "md:ml-auto" : "md:mr-auto"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-cyan-400">{event.title}</h3>
              <span className="text-sm font-bold bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent bg-clip-text">
                {event.year}
              </span>
            </div>
            <p className="text-gray-300 text-sm">{event.description}</p>
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
          viewport={{ once: true }}
          className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white my-4 md:my-0"
        >
          {getIcon(event.icon)}
        </motion.div>
      </div>
    </div>
  )
}
