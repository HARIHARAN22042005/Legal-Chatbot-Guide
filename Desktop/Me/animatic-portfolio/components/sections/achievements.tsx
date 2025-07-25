"use client"

import { motion } from "framer-motion"
import { Award, Star, Trophy, Zap } from "lucide-react"

export default function Achievements() {
  const achievements = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-400" />,
      title: "Best Project Award",
      description: "Recognized for outstanding web development project in college",
      year: "2024",
    },
    {
      icon: <Star className="h-8 w-8 text-cyan-400" />,
      title: "5-Star Freelancer",
      description: "Maintained perfect rating across all freelance projects",
      year: "2023-2024",
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-400" />,
      title: "Fast Learner",
      description: "Mastered React and Next.js in record time",
      year: "2023",
    },
    {
      icon: <Award className="h-8 w-8 text-pink-400" />,
      title: "Community Contributor",
      description: "Active contributor to open-source projects",
      year: "2022-2024",
    },
  ]

  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Milestones that mark my journey in web development</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 text-center group"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
              <span className="text-xs text-cyan-400 font-medium">{achievement.year}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl -z-10"></div>
    </section>
  )
}
