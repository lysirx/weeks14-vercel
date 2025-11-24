'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Definisi tipe sesuai screenshot Anda
interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  notes?: string | null;
  isFinished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EditBookForm({ bookId }: { bookId: string }) {
  const router = useRouter();

  // PERBAIKAN DI SINI:
  // Jangan gunakan 'initialBook' yang tidak ada.
  // Gunakan object kosong sebagai nilai awal.
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    rating: 1,
    notes: '',
    isFinished: false,
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Data saat komponen dimuat
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${bookId}`);
        if (!res.ok) throw new Error('Data buku tidak ditemukan');
        
        const data: Book = await res.json();
        
        // Masukkan data dari API ke state
        setBookData({
          title: data.title,
          author: data.author,
          rating: data.rating,
          notes: data.notes || '', // Handle null notes
          isFinished: data.isFinished,
        });
      } catch (error) {
        console.error(error);
        alert('Gagal memuat data buku.');
        router.push('/books');
      } finally {
        setLoading(false);
      }
    };

    if (bookId) fetchBook();
  }, [bookId, router]);

  // 2. Handle Perubahan Input (Generic Handler seperti di screenshot Anda)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setBookData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }));
  };

  // 3. Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // Konversi rating ke integer sebelum kirim
        body: JSON.stringify({
            ...bookData,
            rating: parseInt(bookData.rating.toString())
        }),
      });

      if (!res.ok) throw new Error('Gagal update buku');

      router.push('/books');
      router.refresh(); 
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center text-primary">Edit Buku</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input 
            name="title"
            type="text" 
            className="form-control" 
            value={bookData.title}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Penulis</label>
          <input 
            name="author"
            type="text" 
            className="form-control" 
            value={bookData.author}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Rating</label>
            <input 
              name="rating"
              type="number" 
              className="form-control" 
              min="1" max="5"
              value={bookData.rating}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="col-md-6 d-flex align-items-end">
            <div className="form-check mb-2">
              <input 
                name="isFinished"
                className="form-check-input" 
                type="checkbox" 
                checked={bookData.isFinished}
                onChange={handleChange}
              />
              <label className="form-check-label">Sudah Selesai?</label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Catatan</label>
          <textarea 
            name="notes"
            className="form-control" 
            rows={3}
            value={bookData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-2 justify-content-end">
          <Link href="/books" className="btn btn-secondary">Batal</Link>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}