import React from 'react';
import { Card, SectionTitle } from '../../components/ui';

export default function AboutPage() {
  return (
    <main className="container mx-auto py-8">
      <SectionTitle>About ClothifyStore</SectionTitle>
      <Card className="p-8 max-w-2xl mx-auto text-center">
        <p className="mb-4 text-lg">ClothifyStore is your destination for the latest ethnic fashion, inspired by the elegance and variety of <a href="https://peachmode.com/" className="text-primary underline" target="_blank" rel="noopener noreferrer">Peachmode</a>. We bring you a curated collection of sarees, suits, kurtis, and more—delivered with love and style.</p>
        <p className="text-gray-600">Our mission is to make premium ethnic wear accessible to everyone, with unbeatable prices, fast shipping, and a seamless shopping experience.</p>
      </Card>
    </main>
  );
} 