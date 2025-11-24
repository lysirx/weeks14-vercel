// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div 
        className="d-flex align-items-center justify-content-center text-center text-white" 
        style={{ minHeight: '100vh', backgroundColor: '#343a40' }}
    >
      <div className="container">
        <div className="card shadow-lg p-5 bg-dark border-danger" style={{ maxWidth: '600px', margin: 'auto' }}>
          <h1 className="display-1 text-danger fw-bold">404</h1>
          <h2 className="text-light mb-4">Halaman Tidak Ditemukan</h2>
          <p className="lead text-light">
            Kami mohon maaf, URL yang Anda cari tidak ada di Jurnal Bacaan ini.
          </p>
          <hr className="my-4" />
          <Link href="/" className="btn btn-outline-light btn-lg">
            &larr; Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}