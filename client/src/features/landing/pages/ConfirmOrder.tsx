import { useEffect, useState } from "react";
import { useCart } from "../../../shared/hooks/useCartContext";
import { useUser } from "../../../shared/hooks/useUserContext";
import { useNavigate } from "@tanstack/react-router";
import Button from "../../../shared/components/Button";
import { faCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import useAxiosError from "../../../shared/hooks/useAxiosError";
import { createOrder } from "../services/order";
import { Toast } from "../components/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function ConfirmOrderPage() {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const [pending, setPending] = useState({
    isPending: false,
    finallyOrder: false
  });

  const navigate = useNavigate();
  const { handleError } = useAxiosError();

  // Use actual cart items if populated, otherwise use mockup items for the design showcase

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0.00; // Free shipping
  const total = subtotal + shipping;

  useEffect(() => {
    if (cart.length === 0 || !user && !pending.finallyOrder) navigate({ to: "/" });

  }, [cart.length, user, pending.finallyOrder, navigate]);


  const handleCreateOrder = async () => {
    setPending({ ...pending, isPending: true });
    try {
      const order = cart.map((item) => ({
        idProduct: item.id,
        quantity: item.quantity,
        name: item.name
      }));

      const res = await createOrder(order);

      if (res.status === 201) {
        setPending({ isPending: false, finallyOrder: true });
        Toast.fire({
          icon: "success",
          title: res.data.message,
          timer: 3000,
          didClose: () => {
            navigate({ to: "/dashboard/orders" });
            clearCart();
          }
        });
      }

    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090D16] font-sans text-slate-200 py-16 px-6 sm:px-8 lg:px-12 selection:bg-violet-500/30 selection:text-violet-200 overflow-hidden">
      {/* Decorative ambient glowing blur spots */}
      <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-linear-to-tr from-violet-600/10 to-fuchsia-600/5 blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-linear-to-bl from-cyan-500/10 to-violet-500/10 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Confirmar Pedido
          </h1>
          <div className="mt-2 h-px w-20 bg-linear-to-r from-violet-500/50 to-transparent"></div>
          <p className="mt-3 text-slate-400 text-sm">
            Revisa los detalles de tu compra e introduce la dirección de entrega para finalizar.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Shipping details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Shipping Address Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/20 to-transparent"></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  <i className="fa-solid fa-truck-fast text-sm"></i>
                </div>
                <h3 className="font-display text-lg font-bold text-white tracking-wide">
                  Dirección de Envío
                </h3>
              </div>

              <div className="space-y-6 my-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Nombre */}
                  <div className="flex gap-3">
                    <div className="text-violet-400 mt-0.5 shrink-0">
                      <i className="fa-solid fa-user text-sm"></i>
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Destinatario</span>
                      <span className="text-sm font-bold text-white mt-1 block">
                        {user?.name || "Juan Pérez"}
                      </span>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex gap-3">
                    <div className="text-violet-400 mt-0.5 shrink-0">
                      <i className="fa-solid fa-phone text-sm"></i>
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Teléfono de contacto</span>
                      <span className="text-sm font-bold text-white mt-1 block">
                        {user?.phone || "+56 9 1234 5678"}
                      </span>
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="flex gap-3 sm:col-span-2">
                    <div className="text-violet-400 mt-0.5 shrink-0">
                      <i className="fa-solid fa-map-pin text-sm"></i>
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Dirección de entrega</span>
                      <span className="text-sm font-bold text-white mt-1 block">
                        {user?.address || "Av. Providencia 1245, Depto 402, Providencia, Santiago"}
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-3 sm:col-span-2">
                    <div className="text-violet-400 mt-0.5 shrink-0">
                      <i className="fa-solid fa-envelope text-sm"></i>
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Correo electrónico</span>
                      <span className="text-sm font-bold text-white mt-1 block">
                        {user?.email || "juan.perez@ejemplo.com"}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Info Note */}
                <div className="p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10 flex items-start gap-2.5 mt-2">
                  <i className="fa-solid fa-circle-info text-violet-400 text-xs mt-0.5"></i>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Los datos de envío corresponden a la información de tu perfil de usuario. Si necesitas cambiarlos, actualízalos en la configuración de tu cuenta antes de proceder.
                  </p>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column: Order summary and CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Order Items Summary Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col">
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/20 to-transparent"></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  <i className="fa-solid fa-list-check text-sm"></i>
                </div>
                <h3 className="font-display text-lg font-bold text-white tracking-wide">
                  Resumen de Compra
                </h3>
              </div>

              {/* Items List (scrollable) */}
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-2xl border border-white/5 bg-[#0F1420]/30 hover:border-white/10 transition-colors">
                    {/* Item Thumbnail */}
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-950/50 border border-white/5">
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    {/* Item details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-white truncate leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-xs font-bold text-white shrink-0">
                          $ {Intl.NumberFormat().format(item.price * item.quantity)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                        <span>Cantidad: <span className="text-violet-400 font-semibold">{item.quantity}</span></span>
                        <span>$ {Intl.NumberFormat().format(item.price)} c/u</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Separation line */}
              <div className="h-px bg-white/5 my-6"></div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">$ {Intl.NumberFormat().format(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Envío estándar</span>
                  <span className="text-emerald-400 font-medium">Gratis</span>
                </div>
                <div className="h-px bg-white/5 my-2"></div>
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-semibold text-white">Total a pagar</span>
                  <span className="font-display text-xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-pink-400">
                    $ {Intl.NumberFormat().format(total)}
                  </span>
                </div>
              </div>

              {/* Confirm Order Button */}
              <Button
                disabled={pending.isPending || pending.finallyOrder}
                onClick={handleCreateOrder}
                className="w-full cursor-pointer py-4 px-6 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_15px_30px_rgba(139,92,246,0.5)] hover:scale-[1.01] active:scale-98 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={pending.finallyOrder ? faCheck : faLock} />
                {pending.finallyOrder ? "Pedido realizado" : "Confirmar y Pagar"}
              </Button>


              {/* Security info */}
              <div className="mt-4 text-center space-y-1">
                <p className="text-[10px] text-slate-500">
                  Al confirmar tu pedido aceptas nuestros términos y condiciones de compra.
                </p>
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <i className="fa-solid fa-shield-halved text-violet-400"></i>
                  Garantía de devolución de 30 días incluida.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}