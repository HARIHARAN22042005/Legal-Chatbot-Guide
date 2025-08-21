"use client"

import { motion } from "framer-motion"
import { Download, Mail, Phone, MapPin, Linkedin, Github, Calendar, Award, Briefcase, GraduationCap, Code, Star } from "lucide-react"
import { resumeData } from "@/data/resume"

export default function ResumeSection() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {resumeData.personalInfo.name}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 text-gray-300">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-cyan-400" />
            <span className="text-sm">{resumeData.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-cyan-400" />
            <span className="text-sm">{resumeData.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span className="text-sm">{resumeData.personalInfo.location}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href={`https://linkedin.com/in/${resumeData.personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="/hariharan.pdf"
            download="Hariharan_S_Resume.pdf"
            className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>
      </motion.div>

      {/* Objective */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
          <Star className="h-6 w-6" />
          Objective
        </h2>
        <p className="text-gray-300 leading-relaxed">{resumeData.objective}</p>
      </motion.section>

      {/* Education */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          Education
        </h2>
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="border-l-2 border-purple-500 pl-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{edu.institution}</h3>
                  <p className="text-purple-400">{edu.degree}</p>
                  <p className="text-gray-400 text-sm">{edu.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300">{edu.duration}</p>
                  {edu.cgpa && <p className="text-sm text-green-400">CGPA: {edu.cgpa}</p>}
                  {edu.percentage && <p className="text-sm text-green-400">{edu.percentage}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Technical Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
          <Code className="h-6 w-6" />
          Technical Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(resumeData.technicalSkills).map(([category, skills]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-lg font-medium text-purple-400 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm border border-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Internships */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
          <Briefcase className="h-6 w-6" />
          Internships
        </h2>
        <div className="space-y-6">
          {resumeData.internships.map((internship, index) => (
            <div key={index} className="border-l-2 border-cyan-500 pl-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{internship.role}</h3>
                  <p className="text-cyan-400">{internship.company}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4" />
                  {internship.duration}
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{internship.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {internship.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Certificates */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
          <Award className="h-6 w-6" />
          Certificates
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {resumeData.certificates.map((cert, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <h3 className="text-white font-medium">{cert.name}</h3>
              <p className="text-purple-400 text-sm">{cert.issuer}</p>
              <p className="text-gray-400 text-xs">{cert.year}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
