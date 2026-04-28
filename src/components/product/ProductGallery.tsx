import { useState } from 'react';

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        {images.map((img, i) => (
          <img
            key={img + i}
            src={img}
            alt={alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`aspect-square overflow-hidden bg-charcoal transition-all duration-200 ${
                i === active
                  ? 'ring-1 ring-gold opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${alt} — vista ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
