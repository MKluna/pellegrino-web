import { useStore } from '@nanostores/react';
import { cartCount, isCartOpen, hydrateCart } from '../../stores/cartStore';
import { useEffect } from 'react';
import CartDrawer from './CartDrawer';

export default function CartIcon() {
  const count = useStore(cartCount);
  const open = useStore(isCartOpen);

  useEffect(() => {
    hydrateCart();
  }, []);

  return (
    <>
      <button
        onClick={() => isCartOpen.set(!open)}
        aria-label="Abrir carrito"
        className="relative p-2 text-parchment hover:text-gold transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
          />
        </svg>
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-gold text-obsidian text-[10px] font-sans font-medium w-4 h-4 rounded-full flex items-center justify-center leading-none">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      <CartDrawer />
    </>
  );
}
