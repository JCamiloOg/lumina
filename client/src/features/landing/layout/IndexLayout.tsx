import { Outlet } from "@tanstack/react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useCart } from "../../../shared/hooks/useCartContext";
import OffCanva from "../components/OffCanva";



export default function IndexLayout() {
    const { isOpen, setIsOpen } = useCart();

    return (
        <>
            <div className="relative flex flex-col  min-h-screen bg-[#090D16] font-sans selection:bg-violet-500/30 selection:text-violet-200">

                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-linear-to-tr from-violet-600/20 to-fuchsia-600/10 blur-[130px] pointer-events-none animate-pulse duration-8000"></div>
                <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-linear-to-bl from-cyan-500/15 to-violet-500/10 blur-[120px] pointer-events-none animate-pulse duration-10000"></div>
                <div className="absolute bottom-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-linear-to-tr from-pink-500/10 to-indigo-600/15 blur-[140px] pointer-events-none"></div>

                <Navbar />

                <OffCanva isOpen={isOpen} onClose={() => setIsOpen(false)} />

                <div className="grow">
                    <Outlet />
                </div>

                <Footer />
            </div>

        </>
    );
}