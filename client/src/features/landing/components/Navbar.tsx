import { faArrowRight, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useUser } from "../../../shared/hooks/useUserContext";
import { useCart } from "../../../shared/hooks/useCartContext";


export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { user } = useUser();

    const { setIsOpen, cart } = useCart();
    const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { to: "/", label: "Inicio" },
        { to: "/products", label: "Productos" }
    ];

    const activeClass = {
        link: "text-white",
        span: "w-full"
    };

    // const handleLogout = () => {
    //     setUser(null);
    //     localStorage.removeItem("token");
    // };

    const inactiveClass = {
        link: "text-white/70 hover:text-white transition-colors py-1 group",
        span: "transition-all duration-300  w-0 group-hover:w-full"
    };
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#090D16]/40 backdrop-blur-md transition-all duration-300">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-violet-500/40 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]">
                        <div className="h-3 w-3 rounded-full bg-linear-to-tr from-violet-500 to-pink-500 animate-pulse"></div>
                        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/10 transition-colors"></div>
                    </div>
                    <span className="font-display text-xl font-bold tracking-widest text-white transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-slate-400">
                        LUMINA
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link to={link.to}
                            className="relative text-sm font-medium transition-colors py-1 group"

                            activeProps={{ className: activeClass.link }}
                            inactiveProps={{ className: inactiveClass.link }}
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 group-aria-[current=page]:w-full bg-violet-500 transition-all duration-300 group-hover:w-full"></span>

                        </Link>
                    ))
                    }
                </nav>

                {/* Login Button */}
                {
                    !user ? (
                        <div className="hidden md:flex items-center">
                            <Link
                                to="/login"
                                className="relative group cursor-pointer overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-violet-500/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-1.5">
                                    Iniciar Sesión
                                    <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-linear-to-r from-violet-600/10 to-indigo-600/10 transition-transform duration-500 ease-out"></div>
                            </Link>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-5">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="relative group cursor-pointer overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-violet-500/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-1.5">
                                    Carrito
                                    <span className="relative flex items-center">
                                        <FontAwesomeIcon icon={faCartShopping} className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        {cartItemsCount > 0 && (
                                            <span className="absolute -top-2.5 -right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-linear-to-r from-violet-600 to-pink-500 text-[9px] font-bold text-white border border-[#090D16] shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                                                {cartItemsCount}
                                            </span>
                                        )}
                                    </span>
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-linear-to-r from-violet-600/10 to-indigo-600/10 transition-transform duration-500 ease-out"></div>
                            </button>

                            {/* profile */}
                            <Link
                                to="/dashboard"
                                className="relative group cursor-pointer overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-violet-500/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-1.5">
                                    Gestión
                                    <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-linear-to-r from-violet-600/10 to-indigo-600/10 transition-transform duration-500 ease-out"></div>
                            </Link>

                        </div>

                    )
                }

                {/* Mobile Menu Button */}
                <div className={`md:hidden`}>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-slate-400 hover:text-white transition-colors focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            <div
                className={`md:hidden absolute top-full left-0 w-full border-b border-white/5 bg-[#090D16]/95 backdrop-blur-lg px-6 py-6 transition-all duration-500 ease-in-out overflow-hidden ${
                    mobileMenuOpen
                        ? "max-h-[350px] opacity-100 visible shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        : "max-h-0 opacity-0 invisible pointer-events-none"
                }`}
            >
                <div className="flex flex-col gap-4">
                    <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-semibold hover:text-white py-2 border-b border-white/5 transition-colors"
                        activeProps={{ className: "text-white" }}
                        inactiveProps={{ className: "text-white/60" }}
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-semibold hover:text-white py-2 border-b border-white/5 transition-colors"
                        activeProps={{ className: "text-white" }}
                        inactiveProps={{ className: "text-white/60" }}
                    >
                        Productos
                    </Link>

                    {/* Action buttons */}
                    {!user ? (
                        <Link
                            to="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3.5 text-center text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_15px_30px_rgba(139,92,246,0.5)] active:scale-95 transition-all duration-300"
                        >
                            Iniciar Sesión
                            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                        </Link>
                    ) : (
                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    setIsOpen(true);
                                }}
                                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                <span className="relative flex items-center gap-1.5">
                                    <span className="relative">
                                        <FontAwesomeIcon icon={faCartShopping} className="text-xs text-violet-400" />
                                        {cartItemsCount > 0 && (
                                            <span className="absolute -top-2.5 -right-2.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-linear-to-r from-violet-600 to-pink-500 text-[8px] font-bold text-white border border-[#090D16] shadow-[0_0_6px_rgba(139,92,246,0.5)]">
                                                {cartItemsCount}
                                            </span>
                                        )}
                                    </span>
                                    Carrito
                                </span>
                            </button>

                            <Link
                                to="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3.5 text-center text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(139,92,246,0.3)] transition-all cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faUser} className="text-xs" />
                                Gestión
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}