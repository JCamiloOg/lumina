import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

// variants Props
type Variant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    variant?: Variant;
}

export default function Button({ children, className, variant = "primary", ...props }: Props) {
    const variantStyles = {
        primary: "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-[0_10px_25px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_15px_30px_rgba(139,92,246,0.5)]",
        secondary: "bg-linear-to-r from-gray-600 to-gray-600 text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]",
        success: "bg-linear-to-r from-green-600 to-green-600 text-white shadow-[0_10px_25px_-5px_rgba(0,255,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,255,0,0.5)]",
        danger: "bg-linear-to-r from-red-600 to-red-600 text-white shadow-[0_10px_25px_-5px_rgba(255,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,0,0,0.5)]",
        warning: "bg-linear-to-r from-yellow-600 to-yellow-600 text-white shadow-[0_10px_25px_-5px_rgba(255,255,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,255,0,0.5)]",
        info: "bg-linear-to-r from-blue-600 to-blue-600 text-white shadow-[0_10px_25px_-5px_rgba(0,0,255,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,255,0.5)]",
        light: "bg-linear-to-r from-white to-white text-gray-900 shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_30px_rgba(255,255,255,0.5)]",
        dark: "bg-linear-to-r from-black to-black text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]",
    };
    return (
        <button
            className={`relative p-4 w-full cursor-pointer overflow-hidden rounded-xl ${variantStyles[variant]} py-3.5 text-sm font-bold  transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}