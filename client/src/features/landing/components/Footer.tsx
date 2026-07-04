import { Link } from "@tanstack/react-router";

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5 bg-[#090D16] mt-24">

            {/* Decorative divider linear */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/20 to-transparent"></div>

            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">

                    {/* Column 1: Brand & Bio */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2.5 mb-6 group">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-violet-500/30 transition-colors">
                                <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>
                            </div>
                            <span className="font-display text-lg font-bold tracking-widest text-white">
                                LUMINA
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            En lumina encontrarás todo lo necesario para sentirte comodo en casa.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="col-span-1 ">
                        <h4 className="font-display text-center text-sm font-semibold text-white tracking-wide mb-6">
                            Explorar
                        </h4>
                        <ul className="space-y-4 text-center">
                            <li>
                                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                                    Sobre Nosotros
                                </a>
                            </li>
                            <li>
                                <a href="#productos" className="text-sm text-slate-400 hover:text-white transition-colors">
                                    Productos
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Lumina. Todos los derechos reservados. Diseñado bajo el principio de simplicidad.
                    </p>

                    {/* Social links */}
                    <div className="flex gap-6">
                        <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">
                            Instagram
                        </a>
                        <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">
                            Twitter
                        </a>
                        <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">
                            Pinterest
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}