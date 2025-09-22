import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Utility Bills Payments',
  description: 'Utility Bills Payment Powered by ILogiBolt',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/ilogibolt.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/ilogibolt.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body className="font-geist antialiased">{children}</body>
    </html>
  )
}
