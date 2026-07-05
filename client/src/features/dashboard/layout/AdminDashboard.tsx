import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../services/dashboard";
import StatCard from "../components/StatCard";
import { faBoxOpen, faCircleNotch, faClipboardList, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminDashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ["dashboard-summary"],
        queryFn: async () => {
            const res = await getDashboardSummary();
            return res.data;
        },
        staleTime: 30_000,
    });

    const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
        Pendiente: { label: "Pendiente", color: "bg-amber-500/10   border-amber-500/25  text-amber-300", dot: "bg-amber-400" },
        Aprobado: { label: "Aprobado", color: "bg-violet-500/10  border-violet-500/25 text-violet-300", dot: "bg-violet-400" },
        Enviado: { label: "Enviado", color: "bg-sky-500/10     border-sky-500/25    text-sky-300", dot: "bg-sky-400" },
        Entregado: { label: "Entregado", color: "bg-emerald-500/10 border-emerald-500/25 text-emerald-300", dot: "bg-emerald-400" },
        Rechazado: { label: "Rechazado", color: "bg-rose-500/10    border-rose-500/25   text-rose-300", dot: "bg-rose-400" },
    };


    const STAT_CARDS = [
        {
            key: "totalUsers" as const,
            label: "Clientes registrados",
            icon: faUsers,
            gradient: "from-violet-600 to-indigo-600",
            glow: "shadow-violet-500/20",
            ring: "border-violet-500/20",
            bg: "from-violet-600/10 to-indigo-600/5",
        },
        {
            key: "totalOrders" as const,
            label: "Pedidos totales",
            icon: faClipboardList,
            gradient: "from-sky-500 to-cyan-600",
            glow: "shadow-sky-500/20",
            ring: "border-sky-500/20",
            bg: "from-sky-500/10 to-cyan-600/5",
        },
        {
            key: "totalProducts" as const,
            label: "Productos en catálogo",
            icon: faBoxOpen,
            gradient: "from-emerald-500 to-teal-600",
            glow: "shadow-emerald-500/20",
            ring: "border-emerald-500/20",
            bg: "from-emerald-500/10 to-teal-600/5",
        },
    ];


    return (
        <div className="flex flex-col gap-8 max-w-5xl">
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STAT_CARDS.map((card) => (
                    <StatCard
                        key={card.key}
                        label={card.label}
                        value={data?.[card.key] ?? 0}
                        icon={card.icon}
                        gradient={card.gradient}
                        glow={card.glow}
                        ring={card.ring}
                        bg={card.bg}
                        loading={isLoading}
                    />
                ))}
            </div>

            {/* Order status breakdown */}
            <div className="rounded-2xl border border-white/5 bg-white/3 backdrop-blur-md p-6">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
                    Estado de pedidos
                </h2>

                {isLoading ? (
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
                        <span>Cargando...</span>
                    </div>
                ) : !data?.ordersByStatus?.length ? (
                    <p className="text-sm text-slate-500">Sin pedidos registrados aún.</p>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {data.ordersByStatus.map(({ status, count }) => {
                            const cfg = STATUS_CONFIG[status] ?? {
                                label: status,
                                color: "bg-white/5 border-white/10 text-slate-300",
                                dot: "bg-slate-400",
                            };
                            return (
                                <div
                                    key={status}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${cfg.color}`}
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`}
                                    />
                                    <span>{cfg.label}</span>
                                    <span className="font-bold">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
