import './globals.css'

export const metadata = {
  title: 'Calculator',
  description: 'A simple Next.js calculator app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}