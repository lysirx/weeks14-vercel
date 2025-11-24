type Book = {
  title: string;
  author_name?: string[];
  cover_i?: number;
  key: string;
  first_publish_year?: number;
};
async function getTrendingBooks() {
  const res = await fetch('https://openlibrary.org/trending/daily.json', {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data buku trending dari API eksternal');
  }
  return res.json();
}

export default async function ExplorePage() {
  let data;
  try {
    data = await getTrendingBooks();
  } catch (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Gagal memuat data API: {(error as Error).message}
        </div>
      </div>
    );
  }

  const trendingWorks = data.works.slice(0, 12); 

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-info">
        ✨ Eksplorasi: Buku Trending Hari Ini (Open Library API)
      </h1>
      <p className="lead text-muted">
        Ini adalah contoh fetching data dari External Public API (Soal 6b).
      </p>

      {/* Grid menggunakan Bootstrap Row dan Col */}
      <div className="row">
         {trendingWorks.map((book: Book, index: number) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-sm border-secondary">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{book.title}</h5>
                <p className="card-text text-muted">
                  Oleh: **{book.author_name ? book.author_name[0] : 'Unknown'}**
                </p>
                <p className="card-text mt-auto">
                  <small className="text-success">
                    Terbit: {book.first_publish_year || 'N/A'}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}