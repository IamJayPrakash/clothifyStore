import React from 'react';
import { Card, SectionTitle } from '../../components/ui';

export default function TermsPage() {
  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Terms & Conditions</SectionTitle>
      <Card className="p-8 max-w-2xl mx-auto text-left">
        <h3 className="font-bold mb-2">1. Acceptance of Terms</h3>
        <p className="mb-4">By using ClothifyStore, you agree to our terms and conditions. Please read them carefully before making a purchase.</p>
        <h3 className="font-bold mb-2">2. Orders & Payments</h3>
        <p className="mb-4">All orders are subject to acceptance and availability. Payments are processed securely via Razorpay.</p>
        <h3 className="font-bold mb-2">3. Returns & Refunds</h3>
        <p className="mb-4">Please refer to our Returns & Refunds policy for details on how to return products and claim refunds.</p>
        <h3 className="font-bold mb-2">4. Privacy</h3>
        <p className="mb-4">Your privacy is important to us. Please review our Privacy Policy for more information.</p>
      </Card>
    </main>
  );
} 