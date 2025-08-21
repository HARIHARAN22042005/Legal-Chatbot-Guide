"use client"

import { motion } from "framer-motion"

interface SkillButtonProps {
  skill: string
  index: number
}

export default function SkillButton({ skill, index }: SkillButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
      <button className="relative w-full py-4 px-6 bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-white font-medium">{skill}</span>
      </button>
    </motion.div>
  )
}
