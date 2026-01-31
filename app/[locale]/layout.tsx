import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next"
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

import CommandPalette from "../components/CommandPalette";
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { locales } from '../../i18n.config';
import { notFound } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common' });

  return {
    metadataBase: new URL('https://portfolio-six-mu-c3zpt9l3gd.vercel.app'),
    title: {
      default: t('seo.title'),
      template: `%s | ${t('seo.title')}`
    },
    description: t('seo.description'),
    keywords: t('seo.keywords').split(',').map(k => k.trim()),
    authors: [{ name: "Akram Hafaiedh" }],
    creator: "Akram Hafaiedh",
    openGraph: {
      title: t('seo.title'),
      description: t('seo.description'),
      url: 'https://portfolio-six-mu-c3zpt9l3gd.vercel.app',
      siteName: 'Akram Hafaiedh Portfolio',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo.title'),
      description: t('seo.description'),
    },
    manifest: '/manifest.json',
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'fr': '/fr',
      },
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
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  const t = await getTranslations({ locale, namespace: 'Common' });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akram Hafaiedh",
    "url": "https://portfolio-six-mu-c3zpt9l3gd.vercel.app",
    "jobTitle": t('seo.title'),
    "image": "https://portfolio-six-mu-c3zpt9l3gd.vercel.app/profile.jpg",
    "description": t('seo.description'),
    "knowsAbout": t('seo.keywords').split(',').map(k => k.trim()),
    "sameAs": [
      "https://github.com/Akram-Hafaiedh",
      "https://linkedin.com/in/akram-hafaiedh"
    ]
  };

  return (
    <html lang={locale} suppressHydrationWarning>
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
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CommandPalette>
            <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
              <Navigation />
              {children}
              <Footer />
            </div>
          </CommandPalette>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
