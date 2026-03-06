import { Typography, Container, Paper, Box } from "@mui/material";

export default function HomePage() {
    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Selamat Datang di Daftar Buku
                    </Typography>
                    <Typography variant="body1">
                        Ini adalah halaman utama aplikasi. Silakan navigasi ke menu
                        <strong> Menu </strong> untuk melihat list buku
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}