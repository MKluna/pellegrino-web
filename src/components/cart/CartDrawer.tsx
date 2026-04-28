import { useStore } from '@nanostores/react';
import {
  cartItems,
  cartTotal,
  isCartOpen,
  removeFromCart,
  updateQuantity,
  buildWhatsAppURL,
} from '../../stores/cartStore';
import { formatPrice } from '../../data/products';

export default function CartDrawer() {
  const open = useStore(isCartOpen);
  const items = useStore(cartItems);
  const total = useStore(cartTotal);

  if (!open && items.length === 0) return null;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-obsidian/70 backdrop-blur-sm animate-fade-in"
          onClick={() => isCartOpen.set(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-[420px] bg-charcoal border-l border-smoke flex flex-col transition-transform duration-350 ease-out ${
          open ? 'translate-x-0 animate-slide-in' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-smoke">
          <h2 className="font-serif text-xl text-cream tracking-wide">
            Tu Selección
          </h2>
          <button
            onClick={() => isCartOpen.set(false)}
            className="text-parchment hover:text-gold transition-colors duration-200 p-1"
            aria-label="Cerrar carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-2 space-y-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} className="text-smoke mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <p className="text-parchment font-light">Tu selección está vacía</p>
              <button
                onClick={() => isCartOpen.set(false)}
                className="mt-4 text-xs text-gold tracking-widest uppercase hover:text-gold-light transition-colors duration-200"
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.slug} className="flex gap-5 py-5 border-b border-smoke/50">
                <a href={`/productos/${item.product.slug}`} onClick={() => isCartOpen.set(false)} className="shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-28 h-36 object-cover"
                  />
                </a>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gold tracking-widest uppercase mb-0.5">
                    {item.product.category}
                  </p>
                  <p className="text-cream text-sm font-light leading-snug">
                    {item.product.name}
                  </p>
                  <p className="text-parchment text-xs mt-1">
                    {formatPrice(item.product.price)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-smoke">
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                        className="px-2 py-1 text-parchment hover:text-gold transition-colors duration-200 text-sm"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-cream text-sm border-x border-smoke">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                        className="px-2 py-1 text-parchment hover:text-gold transition-colors duration-200 text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.slug)}
                      className="text-parchment/50 hover:text-gold transition-colors duration-200"
                      aria-label="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-smoke space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-parchment tracking-wide">Subtotal</span>
              <span className="font-serif text-xl text-cream">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-parchment/60 leading-relaxed">
              El precio final se coordina por WhatsApp. Envíos a todo el país.
            </p>
            <a
              href={buildWhatsAppURL(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-gold text-obsidian text-sm font-sans font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hacer pedido por WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
