import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import 'react-icons/fa';
import { AuthProvider } from "@/contexts/AuthContext";
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Dynamically import the loader with no SSR
const FootballLoader = dynamic(
  () => import('@/components/ui/FootballLoader'),
  { ssr: false }
);

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Goal Gear | Premium Football Equipment',
  description: 'Shop for premium football jerseys, boots, balls and accessories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            <AuthProvider>
              <div className="relative flex min-h-screen flex-col">
                <FootballLoader />
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </AuthProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}