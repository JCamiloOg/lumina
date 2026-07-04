import { useEffect } from "react";
import { useCart } from "../../../shared/hooks/useCartContext";
import { useUser } from "../../../shared/hooks/useUserContext";
import { useNavigate, Link } from "@tanstack/react-router";
import Button from "../../../shared/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faMinus,
  faCartShopping,
  faArrowRight,
  faRotateRight,
  faBagShopping
} from "@fortawesome/free-solid-svg-icons";

export default function CartPage() {
  const { cart, plus, less, removeFromCart, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/" });
  }, [user, navigate]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen text-slate-100 pb-16">
      {/* Background ambient glow */}
      <div className="absolute top-[-10%] left-[20%] w-96 h-96 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-pink-500/5 blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3.5 mb-1.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <FontAwesomeIcon icon={faBagShopping} className="text-lg" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-wide text-white">
                Mi Carrito
              </h1>
              <p className="text-xs text-slate-500">
                Gestiona los productos agregados a tu compra
              </p>
            </div>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center justify-center gap-2 self-start md:self-auto px-4 py-2 text-xs font-bold text-slate-400 hover:text-rose-400 border border-white/5 bg-white/5 hover:bg-rose-500/10 hover:border-rose-500/20 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <FontAwesomeIcon icon={faRotateRight} className="text-[10px]" />
            Vaciar Carrito
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        /* Empty State */
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090D16] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-12 text-center flex flex-col items-center justify-center max-w-2xl mx-auto mt-12">
          {/* Decorative highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />
          <div className="absolute top-[-40%] w-72 h-72 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-6 relative group hover:scale-110 transition-transform duration-300">
            <FontAwesomeIcon icon={faCartShopping} className="text-3xl" />
            <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-md pointer-events-none animate-pulse" />
          </div>

          <h2 className="text-xl font-bold text-white tracking-wide mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-sm text-slate-500 max-w-sm mb-8 leading-relaxed">
            Parece que aún no has añadido productos a tu carrito. Explora nuestra tienda de productos y encuentra lo que buscas.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_15px_30px_rgba(139,92,246,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            Explorar Tienda
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
      ) : (
        /* Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Product List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#090D16]/60 hover:bg-[#090D16]/80 hover:border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300"
              >
                {/* Product Info */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <div className="relative h-20 w-20 rounded-xl border border-white/10 bg-[#0F1420] overflow-hidden shrink-0 group-hover:scale-[1.03] transition-transform duration-300 shadow-md">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm line-clamp-1">
                      {item.description}
                    </p>
                    <p className="text-xs font-bold text-violet-400 mt-2">
                      $ {Intl.NumberFormat("es-CO").format(item.price)} C/U
                    </p>
                  </div>
                </div>

                {/* Actions & Price */}
                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 border-white/5 pt-4 sm:pt-0">
                  {/* Quantity selector */}
                  <div className="flex items-center gap-1 bg-[#0F1420]/60 border border-white/5 p-1 rounded-xl">
                    <button
                      onClick={() => less(item.id)}
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
                      aria-label="Disminuir cantidad"
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-[10px]" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-slate-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => plus(item.id)}
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
                      aria-label="Aumentar cantidad"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
                    </button>
                  </div>

                  {/* Price Summary */}
                  <div className="text-right min-w-[90px]">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Subtotal</p>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">
                      $ {Intl.NumberFormat("es-CO").format(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="h-9 w-9 rounded-xl flex items-center justify-center border border-white/5 bg-white/5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 active:scale-90 transition-all cursor-pointer"
                    aria-label="Eliminar producto"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Card Summary */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090D16] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6">
              {/* Highlight bar */}
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />

              <h3 className="font-display text-lg font-bold text-white tracking-wide border-b border-white/5 pb-4 mb-4">
                Resumen de Compra
              </h3>

              <div className="space-y-3.5 mb-6 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Productos ({totalItems})</span>
                  <span>$ {Intl.NumberFormat("es-CO").format(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Envío estimado</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Gratis</span>
                </div>
                <div className="h-px bg-white/5 my-2" />
                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-bold text-white">Monto Total</span>
                  <span className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">
                    $ {Intl.NumberFormat("es-CO").format(subtotal)}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate({ to: "/confirm-order" })}
                className="w-full flex items-center justify-center gap-2 py-4"
              >
                Proceder al Pago
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-semibold uppercase tracking-widest text-center">
                <i className="fa-solid fa-lock text-[9px]" />
                Pago 100% seguro y encriptado
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}