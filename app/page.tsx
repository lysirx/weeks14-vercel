import Link from 'next/link';

const NAMA = "Vincent Yobello";
const NIM = "535240160";
const TOPIK = "Jurnal Bacaan dan Rating Buku";

export default function Home() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="card shadow-lg p-5 mx-auto border-0" style={{ maxWidth: '600px' }}>
          <div className="card-body text-center">
            <h1 className="card-title display-5 text-primary mb-4 fw-bold">
              📚 Next.js Mini Web App Challenge
            </h1>
            
            <h2 className="card-subtitle mb-4 text-muted fw-light">
              {TOPIK}
            </h2>
            
            <hr className="my-4" />
            
            <div className="text-start mx-auto" style={{ maxWidth: '300px' }}>
              <p className="card-text fs-5 mb-2">
                <span className="fw-bold text-dark">Nama:</span> {NAMA}
              </p>
              <p className="card-text fs-5">
                <span className="fw-bold text-dark">NIM:</span> {NIM}
              </p>
            </div>
            {/* Tombol Navigasi ke Halaman Utama Aplikasi */}
            <div className="mt-4 d-grid gap-2">
              <Link href="/books" className="btn btn-primary btn-lg shadow-sm">
                Mulai Jurnal Saya
              </Link>
              <Link href="/explore" className="btn btn-outline-info btn-sm">
                Eksplorasi API
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}