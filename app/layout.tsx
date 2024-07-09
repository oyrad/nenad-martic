import type { Metadata } from 'next';
import MobileNavigation from './_components/MobileNavigation';
import DesktopNavigation from './_components/DesktopNavigation';
import { Jost } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { ReactNode, Suspense } from 'react';
import NextTopLoader from 'nextjs-toploader';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nenad Martic',
  description: 'Welcome to my world.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        href: '/images/logo-black.svg',
        url: '/images/logo-black.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        href: '/images/logo-white.svg',
        url: '/images/logo-white.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(jost.className, 'text-blackish pb-8')}>
        <NextTopLoader color="#C62F20" showSpinner={false} />
        <Suspense>
          <MobileNavigation />
          <DesktopNavigation />
          <main className="pt-16 md:pt-0">{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
