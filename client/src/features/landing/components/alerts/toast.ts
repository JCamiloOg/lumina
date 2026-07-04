import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: 'rgba(9, 13, 22, 0.9)',
    color: '#ffffff',
    customClass: {
        popup: '!rounded-2xl !border !border-white/10 !shadow-[0_10px_30px_rgba(0,0,0,0.5)] !backdrop-blur-xl !px-4 !py-3 !font-sans',
        title: '!text-white !font-sans !font-bold !text-sm',
        htmlContainer: '!text-slate-300 !font-sans !text-xs',
        timerProgressBar: '!bg-linear-to-r !from-violet-500 !to-pink-500'
    },
    showClass: {
        popup: 'swal2-show'
    },
    hideClass: {
        popup: 'swal2-hide'
    }
});
