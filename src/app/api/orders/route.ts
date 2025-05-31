import { NextResponse } from 'next/server';
import { db } from '../../../firebase/config';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

export async function GET() {
  try {
    const ordersRef = collection(db, 'orders');
    const snapshot = await getDocs(ordersRef);
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Add createdAt timestamp if not present
    if (!data.createdAt) data.createdAt = Timestamp.now();
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, data);
    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 