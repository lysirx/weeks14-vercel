'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  notes?: string;
  isFinished: boolean;
  createdAt: string; 
  updatedAt: string; 
}

export function BookList({ initialBooks }: { initialBooks: Book[] }) {
  const [books, setBooks] = useState(initialBooks);

  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  const handleDelete = async (bookId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus buku ini?')) return;

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBooks(books.filter(book => book.id !== bookId));
      } else {
        alert('Gagal menghapus buku.');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Terjadi kesalahan jaringan.');
    }
  };

  return (
    <div className="row">
      {books.length === 0 ? (
        <div className="alert alert-info w-100">
          Belum ada buku dalam jurnal Anda. Silakan tambahkan satu!
        </div>
      ) : (
        books.map((book) => (
          <div key={book.id} className="col-lg-6 col-xl-4 mb-4">
            <div className="card h-100 shadow-sm border-secondary">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-truncate" title={book.title}>{book.title}</h5>
                    <span className={`badge ${book.isFinished ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {book.isFinished ? 'Selesai' : 'Sedang Dibaca'}
                    </span>
                </div>
                <div className="card-body">
                    <p className="card-text text-muted mb-2">Oleh: {book.author}</p>
                    <p className="card-text">
                        Rating: {'⭐'.repeat(book.rating) || 'N/A'}
                    </p>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-end">
                    <Link 
                        href={`/books/${book.id}/edit`} 
                        className="btn btn-sm btn-outline-primary me-2"
                    >
                        Edit
                    </Link>
                    <Link 
                        href={`/books/${book.id}`} 
                        className="btn btn-sm btn-info me-2 text-white"
                    >
                        Detail
                    </Link>
                    <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => handleDelete(book.id)}
                    >
                        Hapus
                    </button>
                </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}