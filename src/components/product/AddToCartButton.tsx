import { useStore } from '@nanostores/react';
import { cartItems, addToCart, isCartOpen } from '../../stores/cartStore';
import type { Product } from '../../data/products';

interface Props {
  product: Product;
  compact?: boolean;
}

export default function AddToCartButton({ product, compact = false }: Props) {
  const items = useStore(cartItems);
  const inCart = items.some((i) => i.product.slug === product.slug);

  function handleAdd() {
    addToCart(product);
    isCartOpen.set(true);
  }

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        aria-label="Agregar al carrito"
        className="px-5 py-3 bg-gold text-obsidian text-xs font-sans font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-colors duration-200 whitespace-nowrap"
      >
        {inCart ? '+ Otro' : 'Agregar'}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full py-4 bg-gold text-obsidian text-sm font-sans font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-colors duration-200"
    >
      {inCart ? '+ Agregar otro' : 'Agregar al carrito'}
    </button>
  );
}
