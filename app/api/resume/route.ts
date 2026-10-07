import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const resume = await db.collection('settings').findOne({ key: 'resume' });
    return NextResponse.json(resume || { url: '/resume.pdf' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const client = await clientPromise;
    const db = client.db('portfolio');

    await db.collection('settings').updateOne(
      { key: 'resume' },
      { $set: { key: 'resume', url, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 });
  }
}