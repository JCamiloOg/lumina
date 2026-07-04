import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/products";
import { useQuery } from "@tanstack/react-query";
import useAxiosError from "../../../shared/hooks/useAxiosError";
import SkeletonCardProduct from "../components/SkeletonCardProduct";


export default function IndexPage() {

  const { handleError } = useAxiosError();


  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await getProducts(undefined, "6", undefined, true);
      return res.data;
    }
  });

  const products = data?.products;


  useEffect(() => {
    if (isError) handleError(error);

  }, [isError, error, handleError]);




  return (
    <>
      <HeroSection />

      {/* PRODUCTS SECTION (5 PRODUCTS GENERIC GRID) */}
      <section id="productos" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative scroll-mt-20">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-display text-xs font-semibold tracking-widest text-violet-400 uppercase">
            Últimos productos
          </h2>
          <p className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Productos de la mejor calidad
          </p>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Cada producto demuestra calidad y buen gusto.
          </p>
        </div>

        {/* 3-Column Generic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            isPending && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCardProduct key={i} />
                ))}
              </>
            )
          }
          {
            products && products.length > 0 ? products.map((product) => (
              <ProductCard product={product} />
            )) : (
              !isPending && (
                <div className="col-span-full py-16 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-500 mb-4">
                    <i className="fa-solid fa-box-open text-xl"></i>
                  </div>
                  <p className="text-slate-400">No se encontraron productos disponibles.</p>
                </div>
              )
            )
          }

        </div>


      </section>
    </>);
}