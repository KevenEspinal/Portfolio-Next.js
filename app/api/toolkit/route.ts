import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

// Fetch all tools from the database
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio'); 
    const tools = await db.collection('toolkit').find({}).toArray();
    return NextResponse.json(tools);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch toolkit' }, { status: 500 });
  }
}

// Add a new tool to the database
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();
    
    const result = await db.collection('toolkit').insertOne(data);
    return NextResponse.json({ success: true, result });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to add tool' }, { status: 500 });
  }
}

// Update an existing tool in the database
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const data = await request.json();
    const { _id, ...updateData } = data; // Separate the ID from the rest of the data

    if (_id) {
      await db.collection('toolkit').updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update tool' }, { status: 500 });
  }
}

// Delete a tool from the database
export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      await db.collection('toolkit').deleteOne({ _id: new ObjectId(id) });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete tool' }, { status: 500 });
  }
}