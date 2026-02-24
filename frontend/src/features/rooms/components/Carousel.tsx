import { useState } from "react";

interface CarouselProps {
  images: string[] | undefined;
}

const Carousel = ({ images = [] }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-87 bg-neutral-100 flex items-center justify-center italic text-neutral-400">
        Nessuna immagine disponibile
      </div>
    );
  }

  const nextSlide = () =>
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const prevSlide = () =>
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="flex flex-col gap-4 w-full mx-auto">
      <div className="relative h-87 md:h-150 w-full overflow-hidden shadow-2xl bg-black group">
        <img
          src={images[activeIndex]}
          alt={`Room view ${activeIndex + 1}`}
          onClick={(e) => {
            if (window.innerWidth < 768) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              if (x > rect.width / 2) nextSlide();
              else prevSlide();
            }
          }}
          className="w-full h-full object-cover transition-all duration-500 cursor-pointer md:cursor-default"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 hover:text-black backdrop-blur-md text-white p-4 transition-all opacity-0 group-hover:opacity-100 items-center justify-center z-10"
        >
          ❮
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/80 hover:text-black backdrop-blur-md text-white p-4 transition-all opacity-0 group-hover:opacity-100 items-center justify-center z-10"
        >
          ❯
        </button>
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-1 tracking-widest md:hidden">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
      <div className="flex justify-center gap-3 md:hidden">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-8 bg-amber-600" : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="hidden md:flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative w-40 h-24 shrink-0 overflow-hidden border-2 transition-all ${
              activeIndex === index
                ? "border-amber-600 scale-105"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
              alt={`Miniatura ${index}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
