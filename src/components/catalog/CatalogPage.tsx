import { useState, useEffect } from 'react';
import type { Product, Category } from '../../data/products';
import { CATEGORIES, formatPrice } from '../../data/products';
import { addToCart, isCartOpen } from '../../stores/cartStore';

interface Props {
  products: Product[];
  initialCategory?: string;
}

export default function CatalogPage({ products, initialCategory }: Props) {
  const [selected, setSelected] = useState<Category | null>(
    (initialCategory as Category) ?? null
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const cat = url.searchParams.get('categoria') as Category | null;
    if (cat && CATEGORIES.includes(cat)) setSelected(cat);
  }, []);

  const filtered = selected
    ? products.filter((p) => p.category === selected)
    : products;

  function toggleCategory(cat: Category) {
    setSelected((prev) => (prev === cat ? null : cat));
  }

  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* Sidebar */}
      <aside className="w-full md:w-56 shrink-0">
        <p className="text-xs text-gold tracking-[0.25em] uppercase mb-5">Categorías</p>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setSelected(null)}
              className={`text-sm w-full text-left py-1.5 tracking-wide transition-colors duration-150 ${
                selected === null
                  ? 'text-gold'
                  : 'text-parchment hover:text-cream'
              }`}
            >
              Todos los productos
              <span className="ml-2 text-xs text-parchment/50">({products.length})</span>
            </button>
          </li>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <li key={cat}>
                <button
                  onClick={() => toggleCategory(cat)}
                  className={`text-sm w-full text-left py-1.5 tracking-wide transition-colors duration-150 ${
                    selected === cat
                      ? 'text-gold'
                      : 'text-parchment hover:text-cream'
                  }`}
                >
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  <span className="ml-2 text-xs text-parchment/50">({count})</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 pt-8 border-t border-smoke hidden md:block">
          <p className="text-xs text-parchment/50 leading-relaxed">
            Todos nuestros productos son elaborados en cuero genuino argentino.
          </p>
        </div>
      </aside>

      {/* Grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-parchment">
            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
            {selected && (
              <span className="ml-2 text-gold">
                — {selected.charAt(0) + selected.slice(1).toLowerCase()}
              </span>
            )}
          </p>
          {selected && (
            <button
              onClick={() => setSelected(null)}
              className="text-xs text-parchment/50 hover:text-gold transition-colors duration-150 tracking-wide"
            >
              Limpiar filtro ✕
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-parchment/50">
            No hay productos en esta categoría.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((product) => (
              <article key={product.slug} className="group">
                <a href={`/productos/${product.slug}`} className="block">
                  <div className="relative overflow-hidden aspect-[3/4] bg-charcoal">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-4 pb-2">
                    <p className="text-gold text-xs tracking-[0.2em] uppercase mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-serif text-lg text-cream leading-snug group-hover:text-gold transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-parchment text-sm mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </a>
                <button
                  onClick={() => {
                    addToCart(product);
                    isCartOpen.set(true);
                  }}
                  className="mt-2 w-full py-2.5 border border-smoke text-parchment text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  Agregar al carrito
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
