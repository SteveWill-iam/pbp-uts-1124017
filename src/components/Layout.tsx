import { Toolbar, AppBar, Button, Box, Stack, Typography } from "@mui/material"; // Tambahkan Avatar & Typography
import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom"; // Tambahkan useNavigate

export function Layout(props: PropsWithChildren) {

    return (
        <Stack sx={{ minHeight: '100vh', width: '100vw', bgcolor: '#f5f5f5' }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ ml: 2, display: 'flex', gap: 2 }}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'white' }}>Home</Button>
                        </Link>
                        <Link to="/buku" style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: 'white' }}>Menu</Button>
                        </Link>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ flexGrow: 1 }}>
                        {/* Nama Aplikasi */}
                        <Typography variant="h6" component="div">
                            My App
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Area konten utama aplikasi*/}
            <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
                {props.children}
            </Box>
        </Stack>
    );
}