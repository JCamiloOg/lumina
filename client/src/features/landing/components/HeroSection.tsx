

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden px-6 pt-20 pb-28 lg:px-8 flex flex-col items-center justify-center text-center">
            <div className="mx-auto max-w-4xl">

                {/* Eyebrow badge */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-xs font-medium tracking-wide text-violet-300 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                    <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-ping"></span>
                    Colección Ecléctica 2026
                </div>

                {/* Heading */}
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-none">
                    Diseño de Luz Líquida para tu{" "}
                    <span className="block mt-2 bg-clip-text text-transparent bg-linear-to-r from-violet-400 via-pink-400 to-amber-300">
                        Santuario Digital
                    </span>
                </h1>

                {/* Description */}
                <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-slate-400">
                    Sistemas de iluminación inteligente y objetos escultóricos minimalistas diseñados meticulosamente para transformar tu productividad, calma y atmósfera espacial.
                </p>

                {/* Call to Actions */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                    <a
                        href="#productos"
                        className="relative cursor-pointer overflow-hidden rounded-full bg-linear-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-[0_10px_30px_-5px_rgba(139,92,246,0.4)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(139,92,246,0.6)] hover:scale-[1.03] active:scale-[0.98]"
                    >
                        Explorar Colección
                    </a>
                </div>
            </div>

            {/* Floating Ambient Element representation (Liquid Glass Visual) */}
            <div className="relative mt-20 w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-slate-950/40 p-4 sm:p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-violet-500/10 via-transparent to-pink-500/5 pointer-events-none"></div>

                {/* Aesthetic Mockup Box simulating space lighting */}
                <div className="relative overflow-hidden rounded-2xl bg-[#0F1420] aspect-16/8 flex items-center justify-center p-6 sm:p-12 border border-white/5">
                    {/* Soft Ambient Wall backglow in mockup */}
                    <div className="absolute top-[10%] left-[20%] right-[20%] bottom-[30%] bg-linear-to-r from-violet-600 via-fuchsia-600 to-cyan-500 rounded-full blur-[80px] opacity-40 animate-pulse duration-10000"></div>

                    {/* Isometric abstract setup */}
                    <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
                        <div className="w-full h-1 bg-linear-to-r from-transparent via-violet-400 to-transparent opacity-60 filter blur-sm"></div>
                        {/* Abstract glowing product representation */}
                        <div className="mt-8 flex gap-8 items-end justify-center w-full">
                            <div className="w-16 h-28 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg group">
                                <div className="w-6 h-6 rounded-full bg-pink-500 filter blur-md animate-pulse"></div>
                            </div>
                            <div className="w-24 h-40 rounded-xl bg-white/10 border border-white/15 backdrop-blur-lg flex flex-col justify-between p-3 shadow-2xl relative top-[-24px]">
                                <div className="w-4 h-4 rounded-full bg-violet-400"></div>
                                <div className="w-full h-2 rounded bg-white/20"></div>
                            </div>
                            <div className="w-16 h-20 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg">
                                <div className="w-6 h-6 rounded-full bg-cyan-400 filter blur-md animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Grid overlay for futuristic vibe */}
                    <div className="absolute inset-0 bg-[linear-linear(rgba(255,255,255,0.01)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[30px_30px] pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}