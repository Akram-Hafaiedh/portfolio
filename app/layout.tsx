import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import LangSync from "./components/LangSync";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-six-mu-c3zpt9l3gd.vercel.app'),
  title: {
    default: "Akram Hafaiedh - Full Stack Web Developer",
    template: "%s | Akram Hafaiedh"
  },
  description: "Professional portfolio of Akram Hafaiedh, a passionate Full Stack Web Developer with expertise in React, Vue.js, Laravel, Node.js, and modern web technologies.",
  keywords: ["Full Stack Developer", "React", "Vue.js", "Laravel", "Node.js", "JavaScript", "TypeScript", "Web Development", "Tunisia"],
  authors: [{ name: "Akram Hafaiedh" }],
  creator: "Akram Hafaiedh",
  openGraph: {
    title: "Akram Hafaiedh - Full Stack Web Developer",
    description: "Professional portfolio showcasing full stack development projects and expertise",
    url: 'https://portfolio-six-mu-c3zpt9l3gd.vercel.app',
    siteName: 'Akram Hafaiedh Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Akram Hafaiedh - Full Stack Web Developer",
    description: "Professional portfolio showcasing full stack development projects and expertise",
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  appleWebApp: {
    title: 'Akram Portfolio',
    statusBarStyle: 'default',
    capable: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akram Hafaiedh",
    "url": "https://portfolio-six-mu-c3zpt9l3gd.vercel.app",
    "jobTitle": "Full Stack Web Developer",
    "image": "https://portfolio-six-mu-c3zpt9l3gd.vercel.app/profile.jpg", // Assuming there's a profile image or I can just use a placeholder
    "description": "Professional portfolio of Akram Hafaiedh, a passionate Full Stack Web Developer with expertise in React, Vue.js, Laravel, Node.js, and modern web technologies.",
    "knowsAbout": ["React", "Vue.js", "Laravel", "Node.js", "TypeScript", "JavaScript", "Web Development"],
    "sameAs": [
      "https://github.com/Akram-Hafaiedh",
      "https://linkedin.com/in/akram-hafaiedh"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
                  
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
        <LanguageProvider>
          <LangSync />
          <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
            <Navigation />
            {children}

            <Footer />
          </div>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
