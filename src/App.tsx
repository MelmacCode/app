import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import CartDrawer from "@/components/CartDrawer";
import BackToHome from "@/components/BackToHome";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import CookieConsent from "@/components/CookieConsent";
import VideoIntro from "@/components/VideoIntro";
import HomePage from "@/pages/HomePage";
import TiendaPage from "@/pages/TiendaPage";
import BlogPage from "@/pages/BlogPage";
import RutaPage from "@/pages/RutaPage";
import RedesPage from "@/pages/RedesPage";
import ContactoPage from "@/pages/ContactoPage";
import NotFoundPage from "@/pages/NotFoundPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { initGA, usePageTracking } from "@/hooks/useAnalytics";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    initGA();
  }, []);
  usePageTracking();

  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <VideoIntro onComplete={() => setShowIntro(false)} />
      )}

      {!showIntro && (
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
              <Route path="/privacidad" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <BackToHome />
          <Footer />
          <CookieConsent />
        </>
      )}
    </>
  );
}