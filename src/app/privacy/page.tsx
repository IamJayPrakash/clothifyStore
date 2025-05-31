import React from 'react';
import { Card, SectionTitle } from '../../components/ui';

export default function PrivacyPage() {
  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Privacy Policy</SectionTitle>
      <Card className="p-8 max-w-2xl mx-auto text-left">
        <h3 className="font-bold mb-2">1. Information Collection</h3>
        <p className="mb-4">We collect personal information such as your name, email, and address to process your orders and provide a better shopping experience.</p>
        <h3 className="font-bold mb-2">2. Use of Information</h3>
        <p className="mb-4">Your information is used solely for order processing, communication, and improving our services. We do not sell your data to third parties.</p>
        <h3 className="font-bold mb-2">3. Security</h3>
        <p className="mb-4">We implement industry-standard security measures to protect your data. Payments are processed securely via Razorpay.</p>
        <h3 className="font-bold mb-2">4. Contact</h3>
        <p className="mb-4">For any privacy-related queries, contact us at <a href="mailto:contact@clothifystore.com" className="text-primary underline">contact@clothifystore.com</a>.</p>
      </Card>
    </main>
  );
} 