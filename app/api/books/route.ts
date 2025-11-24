import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error("GET /api/books ERROR:", error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const data = await request.json();
    const ratingInt = parseInt(data.rating as string);

    if (isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
      return NextResponse.json({ error: 'Invalid rating. Must be 1-5.' }, { status: 400 });
    }

    const newBook = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        rating: ratingInt,
        notes: data.notes || '',
        isFinished: data.isFinished || false,
      },
    });
    
    return NextResponse.json(newBook, { status: 201 });
    
  } catch (error) {
    console.error('POST /api/books ERROR:', error); 
    return NextResponse.json({ error: 'Failed to create book.' }, { status: 500 }); 
  }
}