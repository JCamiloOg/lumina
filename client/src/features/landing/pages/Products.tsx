import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { Product } from "../../../@types/product";
import useAxiosError from "../../../shared/hooks/useAxiosError";
import SkeletonCardProduct from "../components/SkeletonCardProduct";


export default function ProductsPage() {

    const { page } = useSearch({
        from: "/layout/products"
    });

    const { handleError } = useAxiosError();

    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products", page],
        queryFn: async () => {
            const res = await getProducts(page, "10", undefined, true);
            return res.data;
        }
    });

    const products: Product[] | undefined = data?.products;
    const pagination: { page: number, limit: number, totalPages: number } | undefined = data?.pagination;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination!.totalPages) {
            navigate({
                to: "/products",
                search: {
                    page: newPage
                }
            });
        }
    };

    useEffect(() => {
        if (isError) handleError(error);
    }, [isError, error, handleError]);

    useEffect(() => {

    }, [page]);


    return (
        <div className="relative min-h-screen pb-12">
            {/* Ambient glows specific to the Products page */}
            <div className="absolute top-[10%] left-[-15%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-fuchsia-500/5 blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Nuestra Colección
                    </h1>
                    <div className="mt-3 mx-auto h-px w-24 bg-linear-to-r from-transparent via-violet-500/50 to-transparent"></div>
                    <p className="mt-4 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                        Explora piezas minimalistas diseñadas para elevar la atmósfera y estética de tu entorno.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Stylized Skeleton Loader */}
                    {isLoading && (
                        <>
                            {[...Array(6)].map((_, i) => (
                                <SkeletonCardProduct key={i} />
                            ))}
                        </>
                    )}

                    {/* Products Grid */}
                    {
                        products ? products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        )) : (
                            !isLoading && (
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

                {/* Stylized Pagination */}
                {!isLoading && products && products.length > 0 && pagination && (
                    <div className="mt-20 flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center gap-1.5 bg-[#0F1420]/40 border border-white/5 p-2 rounded-2xl backdrop-blur-xl shadow-2xl">
                            {/* Prev Button */}
                            <button
                                disabled={page === 1}
                                onClick={() => handlePageChange(page - 1)}
                                className="h-10 px-4 rounded-xl border border-white/5 bg-white/5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
                                <i className="fa-solid fa-chevron-left text-[10px]"></i>
                                Anterior
                            </button>

                            {/* Pages */}
                            <div className="flex items-center gap-1">
                                {
                                    Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className="h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold text-white bg-linear-to-r from-violet-600 to-indigo-600 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer">
                                            {pageNumber}
                                        </button>
                                    ))
                                }
                            </div>

                            {/* Next Button */}
                            <button
                                disabled={page === pagination.totalPages}
                                onClick={() => handlePageChange(page + 1)}
                                className="h-10 px-4 rounded-xl border border-white/5 bg-white/5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
                                Siguiente
                                <i className="fa-solid fa-chevron-right text-[10px]"></i>
                            </button>
                        </div>

                        {/* Info details */}
                        <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
                            Pagina <span className="text-violet-400 font-semibold">{page}</span> de <span className="text-violet-400 font-semibold">{pagination.totalPages}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}