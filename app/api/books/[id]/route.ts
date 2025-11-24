import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Perbaikan untuk Next.js 15: params adalah Promise
interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, context: Context) {
  // Tambahkan 'await' di sini
  const { id } = await context.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: Context) {
  // Tambahkan 'await' di sini
  const { id } = await context.params;

  try {
    await prisma.book.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete book or book not found' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: Context) {
  // Tambahkan 'await' di sini
  const { id } = await context.params;
  const data = await request.json();

  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title: data.title,
        author: data.author,
        rating: data.rating,
        notes: data.notes,
        isFinished: data.isFinished,
      },
    });
    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}