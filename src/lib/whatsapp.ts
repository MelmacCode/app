/**
 * WhatsApp Checkout Utility
 * Genera mensaje pre-formateado para pedidos via WhatsApp
 * Costo: $0
 */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  city?: string;
  notes?: string;
}

export function generateWhatsAppCheckoutUrl(
  items: CartItem[],
  customer: CustomerInfo,
  phoneNumber: string
): string {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const itemsList = items
    .map((item, i) => (i + 1) + ". " + item.name + " - " + item.quantity + "x $" + item.price.toFixed(2))
    .join("%0A");

  let message = "Pedido La Taza Nomada %0A%0A";
  message += "Productos (" + totalItems + " articulos): %0A";
  message += itemsList + "%0A%0A";
  message += "Total: $" + total.toFixed(2) + "%0A%0A";
  message += "Nombre: " + customer.name + "%0A";
  message += "Telefono: " + customer.phone + "%0A";
  message += "Direccion: " + customer.address + "%0A";
  if (customer.city) {
    message += "Ciudad: " + customer.city + "%0A";
  }
  if (customer.notes) {
    message += "Notas: " + customer.notes + "%0A";
  }
  message += "%0AGracias por elegirnos!";

  return "https://wa.me/" + phoneNumber + "?text=" + message;
}

export function validateCustomerInfo(info: Partial<CustomerInfo>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!info.name || info.name.trim().length < 2) {
    errors.push("El nombre es requerido (minimo 2 caracteres)");
  }
  if (!info.phone || info.phone.trim().length < 8) {
    errors.push("El telefono es requerido (minimo 8 digitos)");
  }
  if (!info.address || info.address.trim().length < 5) {
    errors.push("La direccion es requerida (minimo 5 caracteres)");
  }

  return { valid: errors.length === 0, errors };
}

export function getWhatsAppNumber(): string {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER;
  if (!number) {
    console.warn("VITE_WHATSAPP_NUMBER no esta configurado en .env");
    return "";
  }
  return number.toString().replace(/\+/g, "").replace(/\s/g, "");
}