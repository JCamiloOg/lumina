import { useEffect, useRef } from "react";
import { usePageLoader } from "../hooks/useLoader";
import { useRouterState } from "@tanstack/react-router";

export default function Loader() {


    const { loading, startLoading, stopLoading } = usePageLoader();
    const { location } = useRouterState();

    const mountedRef = useRef(false);
    const prevBaseRef = useRef<string | null>(null);

    useEffect(() => {
        const pathName = location.pathname;

        const isBaseChange = prevBaseRef.current && prevBaseRef.current !== pathName;

        if (isBaseChange || !mountedRef.current) {
            startLoading();

            // Simulación mínima para UX (puedes ajustar)
            const timeout = setTimeout(() => stopLoading(), 500);

            prevBaseRef.current = pathName;

            return () => clearTimeout(timeout);
        }


        prevBaseRef.current = pathName;
    }, [location.pathname, startLoading, stopLoading]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#090D16]/65 backdrop-blur-lg select-none pointer-events-none">

            {/* Background ambient glow behind the loader */}
            <div className="absolute w-72 h-72 rounded-full bg-violet-600/10 blur-[80px] pointer-events-none"></div>
            <div className="absolute w-60 h-60 rounded-full bg-pink-500/5 blur-[90px] pointer-events-none animate-pulse duration-4000"></div>

            {/* Loader Container */}
            <div className="relative flex flex-col items-center p-8 rounded-3xl border border-white/5 bg-slate-900/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-50">

                {/* Ring & Pulse Spinner */}
                <div className="relative h-20 w-20">
                    {/* Outer spin ring */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-white/5 border-t-violet-500 animate-spin"></div>

                    {/* Secondary slower spin ring with reverse direction */}
                    <div className="absolute inset-2 rounded-full border-2 border-white/5 border-b-pink-500 animate-spin [animation-duration:1.5s] [animation-direction:reverse]"></div>

                    {/* Glowing central core */}
                    <div className="absolute inset-6 rounded-full bg-linear-to-tr from-violet-500 to-pink-500 opacity-80 blur-[2px] animate-pulse"></div>
                    <div className="absolute inset-7 rounded-full bg-[#090D16] flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
                    </div>
                </div>

                {/* Text indicators */}
                <div className="mt-8 text-center">
                    <div className="font-display text-sm font-bold tracking-[0.25em] text-white/90">
                        LUMINA
                    </div>
                    <div className="mt-2 text-xs tracking-wider text-slate-400 font-medium animate-pulse">
                        Cargando...
                    </div>
                </div>

                {/* Decorative corner lines (tech/premium layout details) */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 rounded-tl"></div>
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 rounded-tr"></div>
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 rounded-bl"></div>
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 rounded-br"></div>
            </div>

        </div>
    );
}
