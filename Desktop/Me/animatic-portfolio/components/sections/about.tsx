"use client"

import { motion } from "framer-motion"
import { Code2, Lightbulb, Brain, Coffee, Target } from "lucide-react"
import AnimatedCard from "@/components/ui/animated-card"

export default function About() {
  const stats = [
    { label: "Years of Experience", value: "1", icon: <Coffee className="h-5 w-5" /> },
    { label: "Projects Completed", value: "3+", icon: <Target className="h-5 w-5" /> },
  ]

  const qualities = [
    {
      icon: <Code2 className="h-8 w-8 text-cyan-400" />,
      title: "Full Stack Developer",
      description:
        "Proficient in both frontend and backend technologies, creating end-to-end solutions that are scalable and maintainable.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-purple-400" />,
      title: "Creative Problem Solver",
      description:
        "I approach challenges with innovative thinking, finding elegant solutions to complex technical problems.",
    },
    {
      icon: <Brain className="h-8 w-8 text-pink-400" />,
      title: "Continuous Learner",
      description:
        "Always staying current with the latest technologies and best practices in web development and software engineering.",
    },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">
              Summary
            </h3>

            <p className="text-lg text-gray-300 leading-relaxed">
              I’m a  web developer dedicated to building thoughtful, reliable, and scalable web solutions.
With hands-on experience across both frontend and backend, I bridge design with functionality to deliver real value. 
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              I write clean, maintainable and optimized code and enjoy solving complex challenges with practical, user-centered thinking. Driven by curiosity and craftsmanship.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                Frontend Development
              </span>
              <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">
                Backend Development
              </span>
              <span className="px-4 py-2 bg-pink-500/10 text-pink-400 rounded-full text-sm border border-pink-500/20">
                UI/UX Design
              </span>

            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 text-center group"
              >
                <div className="flex justify-center mb-3 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Qualities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {qualities.map((quality, index) => (
            <AnimatedCard
              key={index}
              icon={quality.icon}
              title={quality.title}
              description={quality.description}
              delay={0.6 + index * 0.2}
            />
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl -z-10"></div>
    </section>
  )
}
