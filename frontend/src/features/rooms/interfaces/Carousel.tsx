import { useState } from "react";

interface CarouselProps {
  images: string[] | undefined;
}

const Carousel = ({ images }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center ">
        <p className="text-gray-400">
          Nessuna immagine disponibile per questa camera
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full  mx-auto">
      <div className="relative h-[600px] w-full overflow-hidden shadow-2xl bg-black">
        <img
          src={images[activeIndex]}
          alt="Room view"
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        />

        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3  transition-all"
        >
          ❮
        </button>
        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1,
            )
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 transition-all"
        >
          ❯
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative w-[200px] h-24  overflow-hidden border-2 transition-all ${
              activeIndex === index
                ? " scale-105 shadow-lg"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
              alt={`thumb ${index}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
