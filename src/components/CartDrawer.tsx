import { useCartStore } from '@/stores/cartStore';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, getProduct } = useCartStore();
  const [detailProduct, setDetailProduct] = useState<string | null>(null);

  const detailProductData = detailProduct ? getProduct(detailProduct) : null;
  const detailItem = detailProduct ? items.find((i) => i.productId === detailProduct) : null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[#1A1410]/30 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full z-[70] transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: 'clamp(320px, 90vw, 450px)',
          backgroundColor: 'var(--cream)',
        }}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--light-border)' }}>
            <h2 className="font-display text-3xl" style={{ color: 'var(--dark-coffee)' }}>Tu Carrito</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:text-terracotta transition-colors"
              style={{ color: 'var(--dark-coffee)' }}
              aria-label="Cerrar carrito"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--warm-brown)', opacity: 0.4 }}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <p className="mt-4 font-body" style={{ color: 'var(--warm-brown)', opacity: 0.6 }}>Tu carrito esta vacio</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <div
                      key={item.productId}
                      className="flex gap-4 p-3 rounded-lg cursor-pointer transition-colors hover:bg-[rgba(26,20,16,0.02)]"
                      style={{ borderBottom: '1px solid var(--light-border)' }}
                      onClick={() => setDetailProduct(item.productId)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate" style={{ color: 'var(--dark-coffee)' }}>{product.name}</h4>
                        <p className="text-sm mt-1" style={{ color: 'var(--terracotta)' }}>${product.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.productId, item.quantity - 1); }}
                            className="w-6 h-6 flex items-center justify-center rounded border transition-colors hover:border-terracotta"
                            style={{ borderColor: 'var(--light-border)' }}
                          >
                            -
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.productId, item.quantity + 1); }}
                            className="w-6 h-6 flex items-center justify-center rounded border transition-colors hover:border-terracotta"
                            style={{ borderColor: 'var(--light-border)' }}
                          >
                            +
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeItem(item.productId); }}
                            className="ml-auto text-xs hover:text-terracotta transition-colors"
                            style={{ color: 'var(--warm-brown)', opacity: 0.6 }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6" style={{ borderTop: '1px solid var(--light-border)' }}>
              <div className="flex justify-between items-center mb-4">
                <span className="font-body" style={{ color: 'var(--warm-brown)' }}>Subtotal</span>
                <span className="font-display text-2xl" style={{ color: 'var(--dark-coffee)' }}>
                  ${totalPrice().toFixed(2)}
                </span>
              </div>
              <button
                className="w-full py-4 text-white font-nav transition-colors hover:opacity-90"
                style={{ backgroundColor: 'var(--terracotta)' }}
              >
                Continuar Compra
              </button>
            </div>
          )}
        </div>
      </div>

      {detailProduct && detailProductData && detailItem && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(26,20,16,0.9)' }}>
          <div className="relative w-full max-w-4xl rounded-lg overflow-hidden flex flex-col md:flex-row" style={{ backgroundColor: 'var(--cream)', maxHeight: '90vh' }}>
            <button
              onClick={() => setDetailProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="md:w-1/2">
              <img
                src={detailProductData.image}
                alt={detailProductData.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-8 overflow-y-auto">
              <h3 className="font-display text-3xl" style={{ color: 'var(--dark-coffee)' }}>{detailProductData.name}</h3>
              <p className="font-display text-2xl mt-2" style={{ color: 'var(--terracotta)' }}>${detailProductData.price.toFixed(2)}</p>
              <p className="font-body mt-4" style={{ color: 'var(--warm-brown)' }}>{detailProductData.description}</p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(detailProduct, detailItem.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded border transition-colors hover:border-terracotta"
                  style={{ borderColor: 'var(--light-border)' }}
                >
                  -
                </button>
                <span className="text-lg font-medium">{detailItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(detailProduct, detailItem.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded border transition-colors hover:border-terracotta"
                  style={{ borderColor: 'var(--light-border)' }}
                >
                  +
                </button>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => removeItem(detailProduct)}
                  className="px-6 py-3 border transition-colors hover:border-terracotta font-nav text-sm"
                  style={{ borderColor: 'var(--light-border)', color: 'var(--dark-coffee)' }}
                >
                  Eliminar
                </button>
                <button
                  onClick={() => setDetailProduct(null)}
                  className="px-6 py-3 text-white font-nav text-sm transition-colors hover:opacity-90"
                  style={{ backgroundColor: 'var(--terracotta)' }}
                >
                  Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
