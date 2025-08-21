"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
  className?: string
}

export default function AnimatedCard({ icon, title, description, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 group ${className}`}
    >
      <div className="mb-4 p-3 bg-gray-900/50 rounded-lg inline-block group-hover:bg-cyan-900/20 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-cyan-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}
