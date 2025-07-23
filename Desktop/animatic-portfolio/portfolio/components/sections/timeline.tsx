"use client"

import { motion } from "framer-motion"
import TimelineItem from "@/components/ui/timeline-item"

export default function Timeline() {
  const timelineEvents = [
    {
      year: "2021",
      title: "First lines of HTML",
      description: "Started my coding journey with HTML and CSS basics.",
      icon: "Code",
    },
    {
      year: "2022",
      title: "JavaScript clicked",
      description: "Mastered JavaScript fundamentals and started building interactive websites.",
      icon: "FileCode",
    },
    {
      year: "2023",
      title: "React + Tailwind love story",
      description: "Discovered the power of React and fell in love with Tailwind CSS.",
      icon: "Atom",
    },
    {
      year: "2024",
      title: "Building projects that solve real problems",
      description: "Started creating applications that provide value and solve real-world problems.",
      icon: "Rocket",
    },
    {
      year: "2025",
      title: "Animatic Portfolio 🚀",
      description: "Launched my interactive portfolio showcasing my journey and skills.",
      icon: "Sparkles",
    },
  ]

  return (
    <section id="timeline" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">My Journey</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">The path that led me to where I am today</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-cyan-500 to-purple-500 h-full"
        ></motion.div>

        <div className="relative">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl -z-10"></div>
    </section>
  )
}
