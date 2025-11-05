// app/api/notices/route.js

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { auth } from "@/auth";

/**
 * Handles GET requests to fetch all notices.
 * This is a public endpoint accessible by anyone.
 */
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("departmentOfCSE");

    const notices = await db
      .collection("notices")
      .find({})
      .sort({ createdAt: -1 }) // Sorts to show the newest notices first
      .toArray();

    return NextResponse.json(notices);
  } catch (e) {
    console.error("Error fetching notices:", e);
    return NextResponse.json({ message: "Internal Server Error: Could not fetch notices." }, { status: 500 });
  }
}

/**
 * Handles POST requests to create a new notice.
 * This is a protected endpoint, only accessible by authenticated admins.
 */
export async function POST(request) {
  // Check authentication
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content } = body;

    // 2. Validate the incoming data
    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("departmentOfCSE");

    const newNotice = {
      title,
      content,
      createdAt: new Date(),
    };

    // 3. Insert the new notice into the database
    const result = await db.collection("notices").insertOne(newNotice);

    return NextResponse.json({ message: "Notice created successfully!", noticeId: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error("Error creating notice:", e);
    return NextResponse.json({ message: "Internal Server Error: Could not create notice." }, { status: 500 });
  }
}