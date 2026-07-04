import { Link, Outlet } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#070A13]">
      {/* Mobile Top Navbar */}
      <header className="md:hidden sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#090D16]/90 border-b border-white/5 backdrop-blur-md">
        <Link to={"/"} className="flex items-center gap-2 group">
          <div className="h-2.5 w-2.5 rounded-full bg-linear-to-tr from-violet-500  to-pink-500 animate-pulse" />
          <span className="font-display text-base font-bold tracking-widest text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-slate-400">
            LUMINA
          </span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
          aria-label="Abrir menú"
        >
          <FontAwesomeIcon icon={faBars} className="text-sm" />
        </button>
      </header>

      {/* Sidebar Component with mobile responsiveness toggles */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}