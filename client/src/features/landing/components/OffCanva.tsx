import { useEffect } from "react";
import { useCart } from "../../../shared/hooks/useCartContext";
import { useNavigate } from "@tanstack/react-router";

interface OffCanvaProps {
  isOpen: boolean;
  onClose: () => void;
}



export default function OffCanva({ isOpen, onClose }: OffCanvaProps) {
  // Prevent body scroll when cart is open

  const { cart, clearCart, less, plus, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0.00; // Free shipping
  const total = subtotal + shipping;

  const handleConfirmOrder = () => {
    navigate({ to: "/confirm-order" });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-100 transition-all duration-500 ease-in-out ${
        isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slide-in cart container */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md sm:w-[450px] bg-[#090D16] border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Soft Ambient glowing blob behind the container */}
        <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[15%] left-[-20%] w-[250px] h-[250px] rounded-full bg-pink-500/5 blur-[80px] pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 p-6 flex items-center justify-between border-b border-white/5 bg-[#090D16]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <i className="fa-solid fa-bag-shopping text-lg"></i>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white tracking-wide">
                Tu Carrito
              </h2>
              <p className="text-xs text-slate-400">
                {cart.length} artículos seleccionados
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all duration-300 active:scale-95"
            aria-label="Cerrar carrito"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Scrollable list of items */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="h-20 w-20 rounded-full bg-slate-950/40 border border-white/5 flex items-center justify-center text-slate-500 mb-6">
                <i className="fa-solid fa-cart-shopping text-3xl"></i>
              </div>
              <h3 className="font-display text-lg font-semibold text-white">El carrito está vacío</h3>
              <p className="text-sm text-slate-400 mt-2 max-w-[250px] mx-auto">
                Explora nuestra colección y añade objetos esculpidos a tu espacio.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Volver a la tienda
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded-2xl border border-white/5 bg-[#0F1420]/40 backdrop-blur-md p-4 flex gap-4 transition-all duration-300 hover:border-white/10 hover:bg-[#0F1420]/60"
              >
                {/* Product Image placeholder */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-950/50 border border-white/5">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-white truncate leading-tight group-hover:text-violet-300 transition-colors">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 cursor-pointer hover:text-rose-400 transition-colors p-1"
                        aria-label="Eliminar producto"
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>

                  {/* Quantity and Price row */}
                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity selectors */}
                    <div className="flex items-center gap-1.5 bg-[#070A10]/60 border border-white/5 rounded-lg p-1">
                      <button
                        onClick={() => less(item.id)}
                        disabled={item.quantity === 1}
                        className="h-6 w-6 rounded-md cursor-pointer flex disabled:cursor-not-allowed disabled:opacity-50 items-center justify-center text-xs text-slate-400 hover:text-white  hover:bg-white/5 transition-all"
                        aria-label="Disminuir cantidad"
                      >
                        <i className="fa-solid fa-minus text-[10px]"></i>
                      </button>
                      <span className="text-xs font-semibold text-white px-2 min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => plus(item.id)}
                        className="h-6 w-6 rounded-md cursor-pointer flex items-center justify-center text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                        aria-label="Aumentar cantidad"
                      >
                        <i className="fa-solid fa-plus text-[10px]"></i>
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-semibold text-white text-sm">
                      $ {Intl.NumberFormat().format(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="relative z-10 p-6 border-t border-white/5 bg-[#090D16]/95 backdrop-blur-md space-y-4">
            {/* Price breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">$ {Intl.NumberFormat().format(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Envío</span>
                <span className="text-emerald-400 font-medium">Gratis</span>
              </div>
              <div className="h-px bg-white/5 my-2"></div>
              <div className="flex justify-between items-baseline">
                <span className="font-display font-semibold text-white">Total</span>
                <span className="font-display text-xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-pink-400">
                  $ {Intl.NumberFormat().format(total)}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => clearCart()}
                className="flex-1 py-3 cursor-pointer px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-slate-300 hover:text-white hover:bg-rose-500/10 hover:border-rose-500/20 active:scale-98 transition-all duration-300"
              >
                <i className="fa-solid fa-circle-xmark mr-2 text-rose-400"></i>
                Vaciar Carrito
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-[1.5] py-3 cursor-pointer px-4 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-xs font-bold text-white shadow-[0_8px_20px_-4px_rgba(139,92,246,0.3)] hover:shadow-[0_12px_24px_rgba(139,92,246,0.4)] hover:scale-[1.01] active:scale-98 transition-all duration-300"
              >
                Realizar Pedido
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </div>

            {/* Security note */}
            <p className="text-[10px] text-center text-slate-500">
              <i className="fa-solid fa-shield-halved mr-1"></i> Pago 100% encriptado y seguro
            </p>
          </div>
        )}
      </div>
    </div>
  );
}