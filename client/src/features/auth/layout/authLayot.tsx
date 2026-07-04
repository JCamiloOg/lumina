import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";

interface AuthLayoutProps {
    loginOrRegister: "login" | "register";
    children: React.ReactNode;
}

export default function AuthLayout({ children, loginOrRegister }: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen w-full bg-[#090D16] font-sans flex items-center justify-center px-4 py-12 selection:bg-violet-500/30 selection:text-violet-200 overflow-hidden">
            {/* Decorative ambient glowing blur spots */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-linear-to-tr from-violet-600/15 to-fuchsia-600/5 blur-[120px] pointer-events-none animate-pulse duration-8000"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-linear-to-bl from-cyan-500/10 to-violet-500/10 blur-[110px] pointer-events-none animate-pulse duration-10000"></div>
            <div className="absolute top-[30%] right-[15%] w-[300px] h-[300px] rounded-full bg-pink-500/5 blur-[100px] pointer-events-none"></div>

            {/* Grid overlay for futuristic vibe */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>

            <div className={`relative z-10 w-full ${loginOrRegister === "register" ? "md:max-w-full max-w-md" : "max-w-md"}`}>
                {/* Back Link */}
                <div className="mb-8 flex justify-center sm:justify-start">
                    <Link
                        to="/"
                        className="group flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-[1.02]"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio
                    </Link>
                </div>

                {/* Login Card */}
                <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] ${loginOrRegister === "register" ? "md:w-full" : ""}`}>
                    {/* Subtle top glow line */}
                    <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent"></div>

                    {/* Logo / Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(139,92,246,0.15)] mb-4">
                            <div className="h-4 w-4 rounded-full bg-linear-to-tr from-violet-500 to-pink-500 animate-pulse"></div>
                        </div>
                        <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            {loginOrRegister === "login" ? "Bienvenido de nuevo" : "Crear una cuenta"}
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            {loginOrRegister === "login"
                                ? "Ingresa tus credenciales para acceder a tu santuario digital"
                                : "Únete a nuestra comunidad y disfruta de todos los beneficios exclusivos"}
                        </p>
                    </div>

                    {children}
                </div>

                {/* Footer Link */}
                <p className="mt-8 text-center text-sm text-slate-400">
                    {loginOrRegister === "login"
                        ? "¿No tienes una cuenta?"
                        : "¿Ya tienes una cuenta?"}
                    {" "}
                    <Link
                        to={loginOrRegister === "login" ? "/register" : "/login"}
                        className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                    >
                        {loginOrRegister === "login" ? "Regístrate aquí" : "Inicia sesión aquí"}
                    </Link>
                </p>
            </div>
        </div>
    );
}