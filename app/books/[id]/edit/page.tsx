import EditBookForm from '@/components/EditBookForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="container mt-5">
      <EditBookForm bookId={id} />
    </div>
  );
}