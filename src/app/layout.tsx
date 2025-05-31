import './globals.css';
import React from 'react';
import Link from 'next/link';
import { AuthProvider } from '../firebase/auth-context';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <AuthProvider>
          <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto flex items-center justify-between py-4 px-2">
              <Link href="/" className="text-2xl font-bold tracking-tight text-primary">ClothifyStore</Link>
              <ul className="flex gap-6 text-base font-medium">
                <li><Link href="/shop" className="hover:text-primary transition">Shop</Link></li>
                <li><Link href="/about" className="hover:text-primary transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition">Contact</Link></li>
                <li><Link href="/orders" className="hover:text-primary transition">Orders</Link></li>
                <li><Link href="/profile" className="hover:text-primary transition">Profile</Link></li>
                <li><Link href="/cart" className="hover:text-primary transition">Cart</Link></li>
              </ul>
            </nav>
          </header>
          <main className="min-h-[80vh]">{children}</main>
          <footer className="border-t bg-gray-50 py-8 mt-12">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-2">
              <div className="text-sm text-gray-500">&copy; {new Date().getFullYear()} ClothifyStore. All rights reserved.</div>
              <ul className="flex gap-4 text-sm">
                <li><Link href="/terms" className="hover:text-primary transition">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition">Privacy</Link></li>
              </ul>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
