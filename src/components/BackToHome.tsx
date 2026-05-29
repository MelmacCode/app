import { Link, useLocation } from 'react-router-dom';

export default function BackToHome() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (isHomePage) return null;

  return (
    <Link
      to="/"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full text-white font-nav text-xs transition-all hover:scale-105 shadow-lg"
      style={{ backgroundColor: 'var(--terracotta)', letterSpacing: '1px' }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      Volver al Inicio
    </Link>
  );
}
