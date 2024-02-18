import Navbar from '@/components/navbar';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Delivery plan',
  description: 'Delivery softwares super fast',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, 'pt-12')}>
          <div className="min-h-screen">
            <Navbar />
            {/* Todo: add a footer */}
            <main>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
