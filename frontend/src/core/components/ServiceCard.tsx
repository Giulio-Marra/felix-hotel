interface ServiceCardProps {
  imageUrl: string;
  title: string;
  text: string;
  delay: string;
}

const ServiceCard = ({ imageUrl, title, text, delay }: ServiceCardProps) => {
  return (
    <div
      className="group relative h-125 overflow-hidden rounded-sm shadow-xl"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <img
        src={imageUrl}
        className="absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        alt="Ristorante"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
      <div className="absolute bottom-10 left-10 text-white">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
