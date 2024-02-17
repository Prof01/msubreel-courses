'use client'
// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider"
import { ApplicationProvider } from "@/store/applicationContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "KartAfrica Academy",
//   description: "Learn Real World Practical Skills",
// };

export default function RootLayout({
  children,
}) {
  return (
    <html lang='en'>
      <header>
        <title>KartAfrica Academy</title>
        <meta name="description" content="Learn Real World Practical Skills." />
        <link rel="icon" href="/favicon.ico" />
      </header>
        <body className={inter.className}>
          <ApplicationProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Providers>{children}</Providers>
            </ThemeProvider>
          </ApplicationProvider>
        </body>
      </html>
  )
}