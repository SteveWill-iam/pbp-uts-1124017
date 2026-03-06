import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Book {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  status: string;
  peminjam: string;
  imageURL: string;
}

const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get("/api/buku");
    const result = response.data.data || response.data.records || response.data;
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Gagal fetch data:", error);
    return [];
  }
};

export default function BookList() {

  const navigate = useNavigate();
  const goToBookDetail = (id: string) => {
    navigate(`/buku/${id}`);
  };

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  if (isLoading) return <div style={{ color: 'white', padding: '20px' }}>Memuat data...</div>;

  return (
    <div>
      <h1>Daftar Buku</h1>

      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid' }}>
              <th>Judul</th>
              <th>Image</th>
              <th>Kategori</th>
              <th>Deskripsi</th>
              <th>Status</th>
              <th>Peminjam</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} style={{ borderBottom: '1px solid' }}>
                <td>{book.judul}</td>
                <td>{book.imageURL}</td>
                <td>{book.deskripsi}</td>
                <td>{book.kategori}</td>
                <td>{book.status}</td>
                <td>{book.peminjam}</td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => goToBookDetail(book.id)}>Detail</button>

                  {/* TOMBOL EDIT */}
                  <button
                    onClick={() => navigate(`/buku/${book.id}`)}
                    style={{ ...actionButtonStyle, backgroundColor: '#ffc107', color: '#000' }}
                  >
                    Edit
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const actionButtonStyle: React.CSSProperties = {
  padding: '5px 10px',
  cursor: 'pointer',
  borderRadius: '4px',
  border: '1px solid #ddd',
  backgroundColor: '#fff'
};