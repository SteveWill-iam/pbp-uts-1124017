import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Container, Paper, Stack, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PostFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [judulBuku, setBookTitle] = useState("");
    const [deskripsiBuku, setBookDesc] = useState("");
    const [tahunBuku, setBookYear] = useState("");
    const [kategoriBuku, setBookCategory] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5173/api/buku/${id}`)
                .then(res => {
                    const book = res.data.data || res.data;
                    setBookTitle(book.judulBuku);
                    setBookDesc(book.deskripsiBuku);
                    setBookYear(book.tahunBuku);
                    setBookCategory(book.kategoriBuku);
                })
                .catch(err => console.error("Gagal mengambil data buku", err));
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // KONVERSI: Pastikan tahun menjadi angka sebelum dikirim ke API
        const payload = {
            // Kiri: Nama yang diminta Backend | Kanan: State dari Frontend
            judul: judulBuku,
            deskripsi: deskripsiBuku,
            tahun: Number(tahunBuku),
            kategori: kategoriBuku,
        };

        try {
            const baseUrl = "http://localhost:5173/api";

            if (id) {
                await axios.put(`${baseUrl}/update-book/${id}`, payload);
            }
            navigate("/buku");
        } catch (error: any) {
            console.error("Detail Error dari Server:", error.response?.data);

            const pesanError = error.response?.data?.message || "Gagal menyimpan buku.";
            alert(`Error: ${pesanError}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Edit Buku
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Judul Buku"
                            fullWidth
                            required
                            value={judulBuku}
                            onChange={(e) => setBookTitle(e.target.value)}
                        />
                        <TextField
                            label="Deskripsi"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            value={deskripsiBuku}
                            onChange={(e) => setBookDesc(e.target.value)}
                        />
                        <TextField
                            label="Tahun"
                            type="number"
                            fullWidth
                            required
                            value={tahunBuku}
                            onChange={(e) => {
                                setBookYear(e.target.value);
                            }}
                        />
                        <>
                            {/* Input Size */}
                            <TextField
                                select
                                label="Kategori"
                                fullWidth
                                required
                                value={kategoriBuku}
                                onChange={(e) => setBookCategory(e.target.value)}
                                sx={{ mt: 2 }}
                            >
                                <MenuItem value="komik">Komik</MenuItem>
                                <MenuItem value="majalah">Majalah</MenuItem>
                                <MenuItem value="novel">Novel</MenuItem>
                            </TextField>
                        </>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Menyimpan..." : "Simpan"}
                            </Button>
                            <Button variant="outlined" onClick={() => navigate(-1)}>
                                Batal
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}