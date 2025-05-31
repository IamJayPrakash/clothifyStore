import React from 'react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="container mx-auto py-24 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="inline-block px-6 py-3 bg-primary text-white rounded hover:bg-primary/90 transition">Go Home</Link>
    </main>
  );
} 