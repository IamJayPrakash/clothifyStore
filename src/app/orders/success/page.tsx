import React from 'react';
import Link from 'next/link';
import { Card, Button } from '../../../components/ui';

export default function OrderSuccessPage() {
  return (
    <main className="container mx-auto py-16 text-center">
      <Card className="p-8 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Thank you for your order!</h1>
        <p className="mb-6">Your payment was successful. We are processing your order and will update you soon.</p>
        <div className="flex justify-center gap-4">
          <Link href="/orders"><Button>View My Orders</Button></Link>
          <Link href="/shop"><Button variant="outline">Continue Shopping</Button></Link>
        </div>
      </Card>
    </main>
  );
} 