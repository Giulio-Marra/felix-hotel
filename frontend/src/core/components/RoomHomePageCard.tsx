import type { RoomResponse } from "../../features/rooms/interfaces/roomInterface";

interface RoomCardHomePageProps {
  room: RoomResponse;
  delay?: string;
}

const RoomHomePageCard = ({ room, delay }: RoomCardHomePageProps) => {
  return (
    <div
      className="group cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="overflow-hidden mb-4 rounded-sm shadow-lg">
        <img
          src={
            room.imageUrls && room.imageUrls.length > 0
              ? room.imageUrls[0]
              : "https://via.placeholder.com/400"
          }
          alt={room.nameRoom}
          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <h3 className="text-2xl font-bold group-hover:text-amber-600 transition-colors">
        {room.nameRoom}
      </h3>
      <p className="text-gray-500 mt-2 font-light">
        {room.roomType} • Max {room.maxOccupancy} persone •{" "}
        {room.facilities.map((f) => f.name).join(", ")}
      </p>

      <p className="text-amber-600 font-bold mt-2 italic">
        A partire da €{room.priceForNight} / notte
      </p>
    </div>
  );
};

export default RoomHomePageCard;
