import { faCircleNotch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StatCard({
    label,
    value,
    icon,
    gradient,
    glow,
    ring,
    bg,
    loading,
}: {
    label: string;
    value: number;
    icon: typeof faUsers;
    gradient: string;
    glow: string;
    ring: string;
    bg: string;
    loading: boolean;
}) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl border ${ring} bg-linear-to-br ${bg} bg-[#090D16]/60 backdrop-blur-md p-6 flex flex-col gap-4 shadow-lg ${glow}`}
        >
            {/* ambient glow blob */}
            <div
                className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-linear-to-br ${gradient} opacity-10 blur-2xl pointer-events-none`}
            />

            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {label}
                </span>
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br ${gradient} shadow-md ${glow}`}
                >
                    <FontAwesomeIcon icon={icon} className="text-white text-sm" />
                </div>
            </div>

            {loading ? (
                <div className="h-12 flex items-center">
                    <FontAwesomeIcon
                        icon={faCircleNotch}
                        className="text-slate-500 text-2xl animate-spin"
                    />
                </div>
            ) : (
                <p className="text-5xl font-bold text-white tracking-tight leading-none">
                    {value.toLocaleString("es-CO")}
                </p>
            )}
        </div>
    );
}
