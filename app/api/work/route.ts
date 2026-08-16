import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const projects = await db.collection('work').find({}).toArray();
    return NextResponse.json(projects);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch work projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();
    
    const result = await db.collection('work').insertOne(data);
    return NextResponse.json({ success: true, result });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to add work project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();
    const { _id, ...updateData } = data;

    if (_id) {
      await db.collection('work').updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update work project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      await db.collection('work').deleteOne({ _id: new ObjectId(id) });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete work project' }, { status: 500 });
  }
}