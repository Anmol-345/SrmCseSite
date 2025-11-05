import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { auth } from "@/auth";

export async function PUT(request, { params }) {
  // Check authentication
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("departmentOfCSE");

    const result = await db.collection('notices').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title: body.title, content: body.content } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Notice updated successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Failed to update notice" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  // Check authentication
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("departmentOfCSE");

    const result = await db.collection('notices').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Notice deleted successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Failed to delete notice" }, { status: 500 });
  }
}