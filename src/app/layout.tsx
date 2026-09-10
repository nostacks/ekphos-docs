import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const geistMono = localFont({
  src: [
    { path: '../../public/fonts/GeistMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/GeistMono-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ekphos.xyz'),
  title: {
    default: 'ekphos',
    template: '%s | ekphos',
  },
  description:
    'A lightweight, fast, terminal-based markdown research tool written in Rust.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geistMono.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-mono">
        <RootProvider
          theme={{
            defaultTheme: 'dark',
            themes: ['light', 'dark'],
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
