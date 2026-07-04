import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    placeholder: string;
    className?: string;
    icon: IconDefinition
    error?: string
    password?: boolean
}

export default function Input({ label, id, placeholder, className, icon, error, password, ...rest }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {label}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <input
                    type={password ? (showPassword ? "text" : "password") : "text"}
                    id={id}
                    placeholder={placeholder}
                    className={`w-full bg-[#070A10]/60 border  rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500  transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:outline-hidden focus:ring-2 ${className} ${error ? "border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20" : "border-white/10  focus:border-violet-500/80  focus:ring-violet-500/20"}`}
                    {...rest}
                />
                {password && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                )}
            </div>

            {error && (
                <p className="text-xs text-red-400 mt-4">{error}</p>
            )}
        </div>
    );
}