import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';

import { Inter } from 'next/font/google';

const fontPrimary = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Memento Mori Widget',
  description: 'Memento mori widget',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-primary antialiased min-h-screen flex items-center justify-center',
          fontPrimary.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
