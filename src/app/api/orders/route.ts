import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // TODO: Fetch orders from Firestore
  return NextResponse.json({ message: 'GET orders - coming soon' });
}

export async function POST(req: NextRequest) {
  // TODO: Create new order in Firestore
  return NextResponse.json({ message: 'POST order - coming soon' });
} 