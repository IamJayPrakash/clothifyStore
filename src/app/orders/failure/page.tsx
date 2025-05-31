import React from 'react';
import Link from 'next/link';
import { Card, Button } from '../../../components/ui';

export default function OrderFailurePage() {
  return (
    <main className="container mx-auto py-16 text-center">
      <Card className="p-8 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Payment Failed</h1>
        <p className="mb-6">Something went wrong with your payment. Please try again or use a different payment method.</p>
        <div className="flex justify-center gap-4">
          <Link href="/checkout"><Button>Retry Checkout</Button></Link>
          <Link href="/cart"><Button variant="outline">Back to Cart</Button></Link>
        </div>
      </Card>
    </main>
  );
} 