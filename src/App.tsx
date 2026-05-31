import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import CartDrawer from "@/components/CartDrawer";
import BackToHome from "@/components/BackToHome";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import HomePage from "@/pages/HomePage";
import TiendaPage from "@/pages/TiendaPage";
import BlogPage from "@/pages/BlogPage";
import RutaPage from "@/pages/RutaPage";
import RedesPage from "@/pages/RedesPage";
import ContactoPage from "@/pages/ContactoPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, usePageTracking } from "@/hooks/useAnalytics";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Inicializar GA4 al montar la app
  useEffect(() => {
    initGA();
  }, []);

  // Trackear cada cambio de pagina
  usePageTracking();

  return (
    <>
      <ScrollToTop />
      <Header />
      <CustomCursor />
      <CartDrawer />
      <ToastProvider />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tienda" element={<TiendaPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/ruta" element={<RutaPage />} />
          <Route path="/redes" element={<RedesPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <BackToHome />
      <Footer />
    </>
  );
}