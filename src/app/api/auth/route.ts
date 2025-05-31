import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export async function POST(req: NextRequest) {
  const { mode, email, password } = await req.json();
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 