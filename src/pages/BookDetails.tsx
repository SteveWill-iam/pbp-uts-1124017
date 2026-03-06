import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Book = {
    id: string;
    judul: string;
    deskripsi: string;
    tahun: number;
    kategori: string;
    status: string;
    peminjam: string;
    imageURL: string;
}

const fetchBookById = async (id: string | undefined): Promise<Book> => {
    if (!id) throw new Error("ID tidak ditemukan");
    const response = await axios.get(`http://localhost:5173/api/buku/${id}`);
    // Menyesuaikan dengan pola PostList: ambil dari .data jika ada wrapper
    return response.data.data || response.data;
};

export default function BookDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const { data: book, isLoading, isError } = useQuery({
        queryKey: ['book', id],
        queryFn: () => fetchBookById(id),
        enabled: !!id, // Hanya jalankan jika id ada
    });

    if (isLoading) return <div style={{ color: 'white', padding: '20px' }}>Memuat detail buku...</div>;

    if (isError || !book) return <div style={{ color: 'white', padding: '20px' }}>Buku tidak ditemukan!</div>;

    return (
        <div style={{ padding: '20px', color: 'white', maxWidth: '800px' }}>
            <button
                onClick={() => goBack()}
                style={{ marginBottom: '20px', cursor: 'pointer' }}
            >
                ← Kembali
            </button>

            <article style={{ background: '#222', padding: '30px', borderRadius: '8px' }}>
                <h1 style={{ color: '#646cff' }}>{book.judul}</h1>
                <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#888' }}>
                    Tahun : <strong>{book.tahun}</strong> |
                    Kategori : <strong>{book.kategori}</strong> |
                    Status : <strong>{book.tahun}</strong> |
                    Peminjam : <strong>{book.peminjam || "Tidak ada Peminjam"}</strong> |
                    Image : <strong>{book.imageURL}</strong> |
                </div>
                <hr style={{ borderColor: '#444' }} />
                <p style={{ lineHeight: '1.6', fontSize: '1.1rem', marginTop: '20px' }}>
                    {book.deskripsi}
                </p>
            </article>
        </div>
    );
}