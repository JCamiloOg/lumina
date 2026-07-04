import Swal from "sweetalert2";

export const MySwal = Swal.mixin({
    background: 'rgba(9, 13, 22, 0.85)',
    color: '#ffffff',
    customClass: {
        container: "!bg-slate-950/65 !backdrop-blur-md",
        popup: '!rounded-[2rem] !border !border-white/10 !shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] !backdrop-blur-xl !px-8 !py-6 !font-sans',
        title: '!text-white !font-display !font-bold !text-2xl !tracking-wide !mb-2',
        htmlContainer: '!text-slate-300 !font-sans !text-sm !leading-relaxed !mb-6',
        confirmButton: '!rounded-full !px-6 !py-2.5 !bg-linear-to-r !from-violet-600 !to-indigo-600 hover:!from-violet-500 hover:!to-indigo-500 !text-white !font-semibold !text-sm !transition-all hover:!scale-105 active:!scale-95 hover:!shadow-[0_0_20px_rgba(139,92,246,0.3)] !cursor-pointer',
        cancelButton: '!rounded-full !px-6 !py-2.5 !bg-white/5 hover:!bg-white/10 !text-white !border !border-white/10 !font-semibold !text-sm !transition-all hover:!scale-105 active:!scale-95 !cursor-pointer',
        actions: '!gap-3',
        icon: '!border-violet-500/30'
    },
    buttonsStyling: false,
    showClass: {
        popup: 'swal2-show'
    },
    hideClass: {
        popup: 'swal2-hide'
    }
});