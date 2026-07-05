export default function ClientDashboard({ name }: { name: string }) {
    return (
        <div className="flex flex-col items-start gap-3 max-w-lg">
            <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/20">
                {name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-bold text-white">
                Bienvenido, <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-indigo-400">{name}</span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
                Desde aquí puedes ver tus pedidos y administrar tu carrito. Usa el menú lateral para navegar.
            </p>
        </div>
    );
}
