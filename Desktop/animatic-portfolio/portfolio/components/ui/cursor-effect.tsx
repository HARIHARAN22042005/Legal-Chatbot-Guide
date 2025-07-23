"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  if (!isClient) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        background: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(139, 92, 246, 0.5)",
          "rgba(14, 165, 233, 0.5)",
          "rgba(59, 130, 246, 0.5)",
        ],
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        background: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
      }}
    />
  )
}
