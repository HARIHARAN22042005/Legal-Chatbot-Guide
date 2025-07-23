"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "#" },
    { icon: <Globe className="h-5 w-5" />, label: "Portfolio", href: "#" },
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
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h2>
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
            onClick={() => (window.location.href = "mailto:hariharan@example.com")}
          >
            <Mail className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            hariharan@example.com
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
