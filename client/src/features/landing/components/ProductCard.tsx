import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Product } from "../../../@types/product";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../../shared/hooks/useCartContext";


interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const { addToCart } = useCart();

    return (
        <div
            key={product.id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/30 backdrop-blur-xl p-6 transition-all duration-500 hover:translate-y-[-6px] hover:border-white/20 hover:shadow-[0_15px_40px_-15px_rgba(139,92,246,0.15)] flex flex-col justify-between"
        >
            {/* Hover dynamic liquid background glow */}
            <div className="absolute -right-24 -bottom-24 w-52 h-52 rounded-full bg-transparent blur-3xl opacity-40 transition-all duration-700 pointer-events-none group-hover:bg-violet-600/10"></div>

            <div>
                {/* Product Image Showcase */}
                <div className="relative overflow-hidden rounded-2xl aspect-4/3 w-full bg-slate-950/50 border border-white/5 mb-6">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#090D16]/65 via-transparent to-transparent opacity-80 pointer-events-none"></div>

                    {/* Category Tag */}
                    {/* <span className="absolute top-4 left-4 inline-block rounded-full bg-slate-950/60 border border-white/10 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-md">
                        {product.tag}
                    </span> */}
                </div>

                {/* Details */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        REF. {product.id}
                    </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white tracking-wide">
                    {product.name}
                </h3>

                <p className="mt-2 text-sm text-slate-400 line-clamp-3">
                    {product.description}
                </p>
            </div>

            {/* Price and Action Button */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="font-display text-2xl font-semibold text-white">
                    $ {Intl.NumberFormat().format(product.price)}
                </span>

                {/* Glass Interactive Trigger (Visual Only) */}
                <button
                    onClick={() => addToCart(product)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white hover:text-[#090D16] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] active:scale-95">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
}