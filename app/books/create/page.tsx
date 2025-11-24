import { CreateBookForm } from '@/components/CreateBookForm'; 

export default function CreatePage() {
  return (
    <div className="container mt-5">
      <h1>Tambah Buku Baru</h1>
      {/* Memanggil component form yang sudah Anda buat */}
      <CreateBookForm /> 
    </div>
  );
}