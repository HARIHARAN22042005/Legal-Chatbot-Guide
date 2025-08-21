"use client"

import { motion } from "framer-motion"
import { Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const socialLinks = [
    { icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.765 21.798 24 17.3 24 12 24 5.373 18.627 0 12 0z"/>
        </svg>
      ), label: "GitHub", href: "https://github.com/HARIHARAN22042005" },
    { icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7 19H4V9h3v10zM5.5 7.73C4.56 7.73 3.8 6.97 3.8 6.03c0-.94.76-1.7 1.7-1.7.94 0 1.7.76 1.7 1.7 0 .94-.76 1.7-1.7 1.7zM20 19h-3v-5.6c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.15 1.46-2.15 2.96V19h-3V9h2.88v1.37h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.61 2 3.61 4.61V19z"/>
        </svg>
      ), label: "LinkedIn", href: "https://www.linkedin.com/in/hariharan-s-920029258" },
    { icon: <Globe className="h-5 w-5" />, label: "Portfolio", href: "/" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="contact" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Ready to start your next project? Let's work together!
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
        >
          Let&apos;s build something amazing together!
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 group"
            onClick={() => (window.location.href = "mailto:hariharan22042005@gmail.com")}
          >
            <Mail className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            hariharan22042005@gmail.com
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              variants={itemVariants}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              {link.icon}
              <span>{link.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-20 text-center text-gray-400 text-sm"
      >
        &copy; {new Date().getFullYear()} Hariharan S. All rights reserved.
      </motion.div>

      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/5 rounded-full filter blur-3xl -z-10"></div>
    </section>
  )
}
