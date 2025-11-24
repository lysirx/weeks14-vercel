import '../src/app/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

export const metadata = {
  title: 'Jurnal Bacaan Next.js',
  description: 'Tugas Next.js Mini Web App Challenge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> 
      <body>
        {children} 
      </body>
    </html>
  );
}