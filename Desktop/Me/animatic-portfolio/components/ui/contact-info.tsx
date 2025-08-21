"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Linkedin, Github, Download } from "lucide-react"
import { resumeData } from "@/data/resume"

export default function ContactInfo() {
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: resumeData.personalInfo.email,
      href: `mailto:${resumeData.personalInfo.email}`,
      color: "text-red-400"
    },
    {
      icon: Phone,
      label: "Phone",
      value: resumeData.personalInfo.phone,
      href: `tel:${resumeData.personalInfo.phone}`,
      color: "text-green-400"
    },
    {
      icon: MapPin,
      label: "Location",
      value: resumeData.personalInfo.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(resumeData.personalInfo.location)}`,
      color: "text-blue-400"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "LinkedIn Profile",
      href: `https://linkedin.com/in/${resumeData.personalInfo.linkedin}`,
      color: "text-blue-500"
    }
  ]

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
      >
        Get In Touch
      </motion.h2>

      <div className="grid gap-4">
        {contactItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target={item.label === "LinkedIn" ? "_blank" : undefined}
            rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
          >
            <div className={`p-3 rounded-full bg-gray-700 group-hover:bg-gray-600 transition-colors ${item.color}`}>
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className="text-white font-medium">{item.value}</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Resume Download Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="pt-4"
      >
        <motion.a
          href="/hariharan.pdf"
          download="Hariharan_S_Resume.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download className="h-5 w-5" />
          Download Resume
        </motion.a>
      </motion.div>
    </div>
  )
}
