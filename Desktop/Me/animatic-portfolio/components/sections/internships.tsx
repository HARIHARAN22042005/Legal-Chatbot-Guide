"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, Code2 } from "lucide-react"
import { resumeData } from "@/data/resume"

export default function Internships() {
  const internships = resumeData.internships

  return (
    <section id="internships" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Internships</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hands-on experience across development and design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {internships.map((internship, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{internship.role}</h3>
                    <p className="text-cyan-400">{internship.company}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  {internship.duration}
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">{internship.description}</p>

              <div>
                <div className="flex items-center text-xs text-gray-400 mb-2">
                  <Code2 className="h-3 w-3 mr-1" />
                  Technologies & Tools
                </div>
                <div className="flex flex-wrap gap-2">
                  {internship.technologies.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl -z-10"></div>
    </section>
  )
}
