"use client";
import React, { useState } from 'react';
import { Card, Input, Button, SectionTitle } from '../../components/ui';
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { name, email, message },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      setSent(true);
    } catch {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
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
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
              <textarea
                className="block w-full rounded border px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition border-gray-300"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                rows={4}
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
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