import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export async function GET(req: NextRequest) {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const productsRef = collection(db, 'products');
  const docRef = await addDoc(productsRef, data);
  return NextResponse.json({ id: docRef.id });
} 