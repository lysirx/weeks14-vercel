'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

export function CreateBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState<number>(5); 
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newBook = { title, author, rating, notes };

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        alert('Buku berhasil ditambahkan!');
        
        setTitle('');
        setAuthor('');
        setNotes('');
        setRating(5);
        
        router.refresh(); 
        
      } else {
        alert('Gagal menambahkan buku. Cek konsol server untuk detail error.');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-3">
      <h5 className="card-title text-success">➕ Tambah Buku Baru</h5>
      <form onSubmit={handleSubmit}>
        {/* Input Judul */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Judul</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        {/* Input Penulis */}
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Penulis</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        {/* Input Rating */}
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating (1-5)</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            value={rating} 
            onChange={(e) => setRating(parseInt(e.target.value) || 1)} 
            min="1"
            max="5"
            required
          />
        </div>
        
        {/* Input Catatan */}
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Catatan Singkat</label>
          <textarea
            className="form-control"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          ></textarea>
        </div>

        {/* Tombol Submit */}
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan Buku'}
        </button>
      </form>
    </div>
  );
}