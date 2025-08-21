import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hariharan portfolio',
  description: 'Created with Hariharan.me',
  generator: 'Hariharan.me',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
