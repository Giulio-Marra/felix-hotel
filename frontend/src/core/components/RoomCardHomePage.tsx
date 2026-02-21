interface RoomCardHomePageProps {
  imageUrl: string;
  title: string;
  features: string;
  price: number;
  delay?: string;
}

const RoomCardHomePage = ({
  imageUrl,
  title,
  features,
  price,
  delay,
}: RoomCardHomePageProps) => {
  return (
    <div
      className="group cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="overflow-hidden mb-4 rounded-sm shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <h3 className="text-2xl font-bold group-hover:text-amber-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 mt-2 font-light">{features}</p>
      <p className="text-amber-600 font-bold mt-2 italic">
        A partire da €{price} / notte
      </p>
    </div>
  );
};

export default RoomCardHomePage;
