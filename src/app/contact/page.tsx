import React, { useState } from 'react';
import { Card, Input, Button, SectionTitle } from '../../components/ui';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Integrate EmailJS or Firebase Function
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <main className="container mx-auto py-8">
      <SectionTitle>Contact Us</SectionTitle>
      <Card className="p-8 max-w-lg mx-auto">
        {sent ? (
          <div className="text-green-600 text-lg text-center">Thank you for contacting us! We will get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
            <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
            <Input label="Message" value={message} onChange={e => setMessage(e.target.value)} as="textarea" required />
            <Button type="submit" className="w-full" loading={loading}>Send Message</Button>
          </form>
        )}
        <div className="mt-8 text-sm text-gray-500 text-center">
          Or email us at <a href="mailto:contact@clothifystore.com" className="text-primary underline">contact@clothifystore.com</a>
        </div>
      </Card>
    </main>
  );
} 