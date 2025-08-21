import type { Metadata } from "next"
import ResumeSection from "@/components/ui/resume-section"
import { motion } from "framer-motion"
import { Printer } from "lucide-react"

export const metadata: Metadata = {
  title: "Resume | Hariharan S",
  description: "Resume of Hariharan S — skills, education, internships, and certificates.",
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 print:hidden">
          <h1 className="text-3xl md:text-4xl font-bold">Resume</h1>
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/60 hover:bg-gray-800 transition-colors"
          >
            <Printer className="h-5 w-5" />
            Print
          </motion.button>
        </div>

        <div className="bg-gray-900/40 rounded-2xl border border-gray-800 p-2 md:p-4">
          <ResumeSection />
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          main { background: white !important; color: #000 !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          nav, footer, .print:hidden { display: none !important; }
          a { color: black !important; text-decoration: none !important; }
        }
      `}</style>
    </main>
  )
}

