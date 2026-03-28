import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fathom Calls Collector',
  description: 'Automated call recording management and transcript processing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Fathom Calls Collector
                  </h1>
                </div>
                <nav className="flex space-x-8">
                  <a href="/dashboard" className="text-gray-500 hover:text-gray-900">
                    Dashboard
                  </a>
                  <a href="/calls" className="text-gray-500 hover:text-gray-900">
                    Calls
                  </a>
                  <a href="/settings" className="text-gray-500 hover:text-gray-900">
                    Settings
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}