"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function ProfilePhoto() {
  return (
    <div className="relative">
      {/* Animated Background Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-0 w-80 h-80 rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20 blur-sm"></div>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-2 w-76 h-76 rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-cyan-500 to-purple-500 opacity-15 blur-sm"></div>
      </motion.div>

      {/* Main Photo Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl shadow-cyan-500/20"
      >
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-1">
          <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Hariharan S - Full Stack Developer"
              width={400}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Overlay Effects */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-gray-900/20 to-transparent"></div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="text-white text-xl">💻</span>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="text-white text-xl">🚀</span>
      </motion.div>

      <motion.div
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="text-white text-lg">⚡</span>
      </motion.div>
    </div>
  )
}
