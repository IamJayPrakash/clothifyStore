import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // TODO: Fetch products from Firestore
  return NextResponse.json({ message: 'GET products - coming soon' });
}

export async function POST(req: NextRequest) {
  // TODO: Add new product to Firestore
  return NextResponse.json({ message: 'POST product - coming soon' });
} 