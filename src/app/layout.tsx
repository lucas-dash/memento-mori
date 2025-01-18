import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/ThemeProvider';

import { Inter, Merriweather, Roboto_Mono } from 'next/font/google';

const fontPrimary = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const fontSerif = Merriweather({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '700'],
  display: 'swap',
});

const fontMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500', '600', '700'],
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
          fontPrimary.variable,
          fontSerif.variable,
          fontMono.variable,
          'font-primary bg-transparent antialiased min-h-screen flex items-center justify-center'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
