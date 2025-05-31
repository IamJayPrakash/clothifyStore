import { NextResponse } from 'next/server';
import { auth } from '../../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export async function POST(request: Request) {
  const { mode, email, password } = await request.json();
  try {
    let user;
    if (mode === 'login') {
      const res = await signInWithEmailAndPassword(auth, email, password);
      user = res.user;
    } else if (mode === 'signup') {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      user = res.user;
    } else {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
    }
    return NextResponse.json({ uid: user.uid, email: user.email });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
} 