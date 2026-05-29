import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import CustomCursor from '@/components/CustomCursor';
import CartDrawer from '@/components/CartDrawer';
import BackToHome from '@/components/BackToHome';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import TiendaPage from '@/pages/TiendaPage';
import BlogPage from '@/pages/BlogPage';
import RutaPage from '@/pages/RutaPage';
import RedesPage from '@/pages/RedesPage';
import ContactoPage from '@/pages/ContactoPage';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: 'var(--cream)', cursor: 'none' }}>
      <ScrollToTop />
      <CustomCursor />
      <Header />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tienda" element={<TiendaPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/ruta-cafe-cacao" element={<RutaPage />} />
          <Route path="/redes" element={<RedesPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToHome />
    </div>
  );
}
