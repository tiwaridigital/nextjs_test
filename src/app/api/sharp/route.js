import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
  const { input } = await request.json();
  // const output = sharp(file)
  console.log('input', input);
  return NextResponse.json({ msg: 'done' });
}
