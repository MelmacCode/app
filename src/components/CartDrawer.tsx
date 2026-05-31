import { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import WhatsAppCheckout from "./WhatsAppCheckout";
import { toast } from "sonner";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems, getProduct } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [detailProduct, setDetailProduct] = useState<string | null>(null);

  const detailProductData = detailProduct ? getProduct(detailProduct) : undefined;
  const detailItem = detailProduct ? items.find((i) => i.productId === detailProduct) : undefined;

  const handleRemove = (productId: string) => {
    const product = getProduct(productId);
    removeItem(productId);
    toast.success(`${product?.name || "Producto"} eliminado del carrito`, {
      description: "Se ha removido correctamente",
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const product = getProduct(productId);
    if (quantity > 0) {
      updateQuantity(productId, quantity);
      toast.success(`Cantidad actualizada`, {
        description: `${product?.name}: ${quantity} unidad${quantity > 1 ? "es" : ""}`,
      });
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => {
            setIsOpen(false);
            setShowCheckout(false);
            setDetailProduct(null);
          }}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-md transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "var(--taza-cream)" }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--taza-border)" }}>
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" style={{ color: "var(--taza-brown)" }} />
              <h2 className="font-display text-2xl" style={{ color: "var(--taza-dark)" }}>
                Tu Carrito
              </h2>
              {totalItems() > 0 && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "var(--taza-brown)", color: "var(--taza-cream)" }}
                >
                  {totalItems()} items
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setShowCheckout(false);
                setDetailProduct(null);
              }}
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-5 h-5" style={{ color: "var(--taza-dark)" }} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <ShoppingBag className="w-16 h-16 opacity-20" style={{ color: "var(--taza-dark)" }} />
                <p className="font-body text-center" style={{ color: "var(--taza-dark-light)" }}>
                  Tu carrito está vacío
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-nav px-6 py-3 rounded-lg transition-colors"
                  style={{ backgroundColor: "var(--taza-brown)", color: "var(--taza-cream)" }}
                >
                  Seguir comprando
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <div
                      key={item.productId}
                      className="flex gap-4 p-4 rounded-lg border transition-all hover:shadow-sm"
                      style={{ borderColor: "var(--taza-border)", backgroundColor: "rgba(255,255,255,0.4)" }}
                    >
                      <button
                        className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                        onClick={() => setDetailProduct(item.productId)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-lg truncate" style={{ color: "var(--taza-dark)" }}>
                          {product.name}
                        </h4>
                        <p className="font-body text-sm mt-1" style={{ color: "var(--taza-brown)" }}>
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors"
                            style={{ borderColor: "var(--taza-border)" }}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors"
                            style={{ borderColor: "var(--taza-border)" }}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleRemove(item.productId)}
                            className="ml-auto p-2 rounded-full transition-colors hover:bg-red-50"
                            style={{ color: "var(--taza-error)" }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t space-y-4" style={{ borderColor: "var(--taza-border)" }}>
              <div className="flex justify-between items-center">
                <span className="font-body" style={{ color: "var(--taza-dark-light)" }}>Subtotal</span>
                <span className="font-display text-2xl" style={{ color: "var(--taza-dark)" }}>
                  ${totalPrice().toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-4 rounded-lg font-nav flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: "var(--taza-brown)", color: "var(--taza-cream)" }}
              >
                Continuar compra
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {detailProduct && detailProductData && detailItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50" onClick={() => setDetailProduct(null)}>
          <div
            className="max-w-sm w-full rounded-2xl p-6 relative"
            style={{ backgroundColor: "var(--taza-cream)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDetailProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={detailProductData.image}
              alt={detailProductData.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-display text-2xl" style={{ color: "var(--taza-dark)" }}>
              {detailProductData.name}
            </h3>
            <p className="font-body text-sm mt-2" style={{ color: "var(--taza-dark-light)" }}>
              {detailProductData.description}
            </p>
            <p className="font-display text-xl mt-4" style={{ color: "var(--taza-brown)" }}>
              ${detailProductData.price.toFixed(2)}
            </p>
            <p className="font-caption mt-2" style={{ color: "var(--taza-dark-light)" }}>
              Cantidad en carrito: {detailItem.quantity}
            </p>
          </div>
        </div>
      )}

      {/* WhatsApp Checkout */}
      {showCheckout && (
        <WhatsAppCheckout
          items={items.map((i) => {
            const p = getProduct(i.productId);
            return {
              id: i.productId,
              name: p?.name || "",
              price: p?.price || 0,
              quantity: i.quantity,
            };
          })}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  );
}