export const metadata = {
  title: '20-Day Python + AI Learning Journey',
  description: 'Track your 20-day Python and AI learning progress',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
