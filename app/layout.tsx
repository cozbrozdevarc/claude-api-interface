import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude API Interface',
  description: 'A modern interface for interacting with Claude AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
