
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  notes: string;
  isFinished: boolean;
  createdAt: string;
}

export default function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books'); 
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus buku ini?')) return;

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Buku berhasil dihapus!');
        fetchBooks(); 
      } else {
        alert('Gagal menghapus buku.');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Halaman */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-6 fw-bold text-primary">📖 Jurnal Bacaan Saya</h1>
        <Link href="/books/create" className="btn btn-success shadow-sm">
          + Tambah Buku Baru
        </Link>
      </div>

      {/* Tampilan jika belum ada buku */}
      {books.length === 0 ? (
        <div className="text-center mt-5">
          <p className="lead text-muted">Belum ada buku yang dicatat.</p>
          <Link href="/books/create" className="btn btn-outline-primary">
            Mulai Menulis Jurnal
          </Link>
        </div>
      ) : (
        /* Grid Daftar Buku */
        <div className="row">
          {books.map((book) => (
            <div key={book.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow border-0">
                <div className="card-body">
                  
                  {/* Judul & Status */}
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold text-dark mb-0">{book.title}</h5>
                    {book.isFinished ? (
                      <span className="badge bg-success" style={{fontSize: '0.7rem'}}>Selesai</span>
                    ) : (
                      <span className="badge bg-warning text-dark" style={{fontSize: '0.7rem'}}>Sedang Baca</span>
                    )}
                  </div>

                  <h6 className="card-subtitle mb-3 text-muted fst-italic small">
                    Penulis: {book.author}
                  </h6>
                  
                  <p className="card-text text-secondary small mb-3">
                    {book.notes ? (book.notes.length > 100 ? book.notes.substring(0, 100) + '...' : book.notes) : 'Tidak ada catatan.'}
                  </p>

                  {/* Rating Bintang */}
                  <div className="mb-4">
                    <span className="fw-bold text-warning">
                      {'★'.repeat(book.rating)}
                      {'☆'.repeat(5 - book.rating)}
                    </span>
                    <span className="text-muted ms-2 small">({book.rating}/5)</span>
                  </div>

                  {/* Tombol Aksi (Edit & Hapus) */}
                  <div className="d-flex gap-2 mt-auto">
                    {/* TOMBOL EDIT BARU */}
                    <Link 
                      href={`/books/${book.id}/edit`} 
                      className="btn btn-sm btn-outline-info w-100"
                    >
                      Edit
                    </Link>

                    <button 
                      onClick={() => handleDelete(book.id)} 
                      className="btn btn-sm btn-outline-danger w-100"
                    >
                      Hapus
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-5 text-center">
        <Link href="/" className="text-decoration-none text-secondary">
          &larr; Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}