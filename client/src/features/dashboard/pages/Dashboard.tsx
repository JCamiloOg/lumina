import { useUser } from "../../../shared/hooks/useUserContext";
import AdminDashboard from "../layout/AdminDashboard";
import ClientDashboard from "../layout/ClientDashboard";




export default function DashboardPage() {
    const { user } = useUser();
    const isAdmin = user?.role === "administrador";

    return (
        <section className="flex flex-col gap-6">
            {/* Page header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-white">
                    {isAdmin ? "Panel de control" : `Bienvenido, ${user?.name ?? "usuario"}`}
                </h1>
                <p className="text-sm text-slate-400">
                    {isAdmin
                        ? "Resumen general de la tienda en tiempo real."
                        : "Gestiona tu carrito y revisa el historial de tus pedidos."}
                </p>
            </div>

            {/* Thin divider */}
            <div className="h-px w-full bg-white/5" />

            {isAdmin ? (
                <AdminDashboard />
            ) : (
                <ClientDashboard name={user?.name ?? "usuario"} />
            )}
        </section>
    );
}