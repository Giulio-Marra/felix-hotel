interface ReviewCardProps {
  name: string;
  text: string;
  stars?: number;
  delay?: string;
}

const ReviewCard = ({ name, text, stars = 5, delay }: ReviewCardProps) => {
  const renderStars = () => "★".repeat(stars);

  return (
    <div
      className="p-8 border border-gray-100 shadow-sm rounded-lg italic text-gray-600 bg-white hover:shadow-md transition-shadow"
      data-aos="zoom-in"
      data-aos-delay={delay}
    >
      <div className="text-amber-400 mb-4 text-xl">{renderStars()}</div>
      <p className="line-height-relaxed">"{text}"</p>
      <p className="mt-6 font-bold not-italic text-black border-t pt-4 border-gray-50">
        — {name}
      </p>
    </div>
  );
};

export default ReviewCard;
