import { atom, computed } from 'nanostores';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const cartItems = atom<CartItem[]>([]);
export const isCartOpen = atom<boolean>(false);

export const cartCount = computed(cartItems, (items) =>
  items.reduce((sum, i) => sum + i.quantity, 0)
);

export const cartTotal = computed(cartItems, (items) =>
  items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
);

export function addToCart(product: Product) {
  const current = cartItems.get();
  const existing = current.find((i) => i.product.slug === product.slug);
  if (existing) {
    cartItems.set(
      current.map((i) =>
        i.product.slug === product.slug
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  } else {
    cartItems.set([...current, { product, quantity: 1 }]);
  }
  persistCart();
}

export function removeFromCart(slug: string) {
  cartItems.set(cartItems.get().filter((i) => i.product.slug !== slug));
  persistCart();
}

export function updateQuantity(slug: string, quantity: number) {
  if (quantity <= 0) return removeFromCart(slug);
  cartItems.set(
    cartItems.get().map((i) =>
      i.product.slug === slug ? { ...i, quantity } : i
    )
  );
  persistCart();
}

export function clearCart() {
  cartItems.set([]);
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('pellegrino_cart');
  }
}

function persistCart() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(
      'pellegrino_cart',
      JSON.stringify(cartItems.get())
    );
  }
}

export function hydrateCart() {
  if (typeof localStorage === 'undefined') return;
  try {
    const saved = localStorage.getItem('pellegrino_cart');
    if (saved) cartItems.set(JSON.parse(saved));
  } catch {
    // silent
  }
}

export function buildWhatsAppURL(items: CartItem[]): string {
  const PHONE = '543834694676';
  const lines = items.map(
    (item) =>
      `• ${item.quantity}x ${item.product.name} (${item.product.category}) — ${formatPrice(item.product.price * item.quantity)}`
  );
  const total = items.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0
  );
  const message = [
    '¡Hola! Me gustaría realizar el siguiente pedido:',
    '',
    ...lines,
    '',
    `*Total: ${formatPrice(total)}*`,
    '',
    'Por favor confirmame disponibilidad y formas de pago. ¡Gracias!',
  ].join('\n');
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
