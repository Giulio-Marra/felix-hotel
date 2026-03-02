import { useNavigate } from "react-router-dom";
import type { BookingModalProps } from "../interfaces/bookingInterfaces";

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-8 max-w-md w-full shadow-2xl rounded-sm border border-neutral-100 text-center">
        <h2 className="font-serif text-2xl mb-4 italic">Camera aggiunta!</h2>
        <p className="text-neutral-500 mb-8 font-light">
          La tua selezione è stata salvata nel carrello. Cosa desideri fare ora?
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/booking/cart")}
            className="w-full bg-neutral-900 text-white py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-amber-700 transition-colors"
          >
            Vai al pagamento
          </button>
          <button
            onClick={onClose}
            className="w-full border border-neutral-200 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors"
          >
            Prenota altre camere
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
