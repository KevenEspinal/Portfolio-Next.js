import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const skills = await db.collection('skills').find({}).toArray();
    return NextResponse.json(skills);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch skills data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();
    
    const result = await db.collection('skills').insertOne(data);
    return NextResponse.json({ success: true, result });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to add skill' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();
    const { _id, ...updateData } = data;

    if (_id) {
      await db.collection('skills').updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}