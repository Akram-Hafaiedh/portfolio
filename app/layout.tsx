import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akram Hafaiedh - Full Stack Web Developer",
  description: "Professional portfolio of Akram Hafaiedh, a passionate Full Stack Web Developer with expertise in React, Vue.js, Laravel, Node.js, and modern web technologies.",
  keywords: ["Full Stack Developer", "React", "Vue.js", "Laravel", "Node.js", "JavaScript", "TypeScript", "Web Development", "Tunisia"],
  authors: [{ name: "Akram Hafaiedh" }],
  openGraph: {
    title: "Akram Hafaiedh - Full Stack Web Developer",
    description: "Professional portfolio showcasing full stack development projects and expertise",
    type: "website",
  },
  appleWebApp: {
    title: 'MyWebSite',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  var shouldBeDark = false;
                  
                  if (savedTheme === 'dark') {
                    shouldBeDark = true;
                  } else if (savedTheme === 'light') {
                    shouldBeDark = false;
                  } else {
                    // No saved preference, use system preference
                    shouldBeDark = systemPrefersDark;
                  }
                  
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  console.log('Initial theme setup:', {
                    savedTheme: savedTheme,
                    systemPrefersDark: systemPrefersDark,
                    shouldBeDark: shouldBeDark
                  });
                } catch (e) {
                  console.error('Theme setup error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
