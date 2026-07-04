import { Link, useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faHome, faUsers, faRightFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../../shared/hooks/useUserContext";
import { useEffect } from "react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { user, setUser, isPendingUser } = useUser();

  const navLinks = {
    "administrador": [
      {
        to: "/dashboard",
        icon: faHome,
        label: "Inicio"
      },
      {
        to: "/dashboard/products",
        icon: faBox,
        label: "Gestión de productos"
      },
      {
        to: "/dashboard/users",
        icon: faUsers,
        label: "Gestión de usuarios"
      },
      {
        to: "/dashboard/orders",
        icon: faBox,
        label: "Gestión de pedidos"
      }
    ],
    "cliente": [
      {
        to: "/dashboard",
        icon: faHome,
        label: "Inicio"
      },
      {
        to: "/dashboard/cart",
        icon: faBox,
        label: "Mi carrito"
      },
      {
        to: "/dashboard/orders",
        icon: faBox,
        label: "Mis pedidos"
      }
    ]
  };

  const navigate = useNavigate();

  // Determine user role and corresponding links (fallback to "cliente" if role is not recognized or user is null)
  const userRole = user?.role === "administrador" ? "administrador" : "cliente";
  const links = navLinks[userRole];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    if (onClose) onClose();
    navigate({ to: "/" });
  };

  useEffect(() => {
    console.log(isPendingUser, user);
    if (!isPendingUser && !user) {
      console.log(1);
      navigate({ to: "/" });
    }
  }, [user, navigate, isPendingUser]);

  return (
    <>
      {/* Drawer Backdrop — only visible on mobile when open */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-90 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar Drawer container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-100 md:z-auto w-64 md:w-72 h-screen bg-[#090D16] border-r border-white/10 flex flex-col justify-between overflow-hidden shrink-0 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Glow ambient spots inside the sidebar */}
        <div className="absolute top-[-20%] left-[-20%] w-60 h-60 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 rounded-full bg-pink-500/5 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col flex-1">
          {/* Logo / Header */}
          <div className="p-6 border-b border-white/5 bg-[#090D16]/40 backdrop-blur-md flex items-center justify-between">
            <Link to="/" onClick={onClose} className="flex items-center gap-2.5 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-violet-500/40 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]">
                <div className="h-3 w-3 rounded-full bg-linear-to-tr from-violet-500 to-pink-500 animate-pulse"></div>
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/10 transition-colors"></div>
              </div>
              <span className="font-display text-lg font-bold tracking-widest text-white transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-slate-400">
                LUMINA
              </span>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
              aria-label="Cerrar menú"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xs" />
            </button>
          </div>

          {/* User profile details header */}
          <div className="p-5 mx-4 my-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-linear-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-violet-500/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white truncate leading-snug">
                {user?.name || "Usuario Lumina"}
              </h4>
              <span className="inline-block mt-1 rounded-full bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[10px] font-semibold text-violet-300 uppercase tracking-wider">
                {userRole}
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-thin">
            {links.map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                onClick={onClose}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/5 border border-transparent transition-all duration-300 group cursor-pointer"
                activeProps={{
                  className: "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold text-white bg-linear-to-r from-violet-600/15 to-indigo-600/10 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                }}
                activeOptions={{
                  exact: true,
                  includeSearch: false
                }}
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors"
                />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer / Logout Button */}
        <div className="relative z-10 p-4 border-t border-white/5 bg-[#090D16]/60 backdrop-blur-md">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 w-full px-4 py-3.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent transition-all duration-300 group cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors"
            />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}