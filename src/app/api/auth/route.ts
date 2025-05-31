import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // TODO: Handle login/signup with Firebase Auth
  return NextResponse.json({ message: 'POST auth - coming soon' });
} 