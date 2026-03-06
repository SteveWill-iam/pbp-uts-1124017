import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
const BookFormPage = lazy(() => import('../pages/BookFormPage'));

// Import Pages
const HomePage = lazy(() => import('../pages/HomePage')); // Halaman baru
const BookListPage = lazy(() => import('../pages/BookList'));
const BookDetailPage = lazy(() => import('../pages/BookDetails'));

export const AppRoutes = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {/* Halaman Utama */}
                <Route path="/" element={<HomePage />} />

                {/* Rute Post */}
                <Route path="/buku" element={<BookListPage />} />
                <Route path="/buku/:id" element={<BookDetailPage />} />

                <>
                    <Route path="/buku/edit/:id" element={<BookFormPage />} />
                </>
            </Routes>
        </Suspense>
    );
};