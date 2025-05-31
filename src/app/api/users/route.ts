import { NextResponse } from 'next/server';
import { db } from '../../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 