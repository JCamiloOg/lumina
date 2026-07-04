import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon = "fa-solid fa-pen-to-square",
  size = "md",
  children,
}: ModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-200 flex items-center justify-center px-4 py-8 transition-all duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal Panel */}
      <div
        className={`relative z-10 w-full ${sizeClasses[size]} bg-[#090D16] rounded-3xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300 ease-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Top glow line */}
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/40 to-transparent pointer-events-none" />

        {/* Ambient glow blobs */}
        <div className="absolute top-[-30%] right-[-20%] w-64 h-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-15%] w-52 h-52 rounded-full bg-pink-500/5 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5 bg-[#090D16]/60 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
              <i className={`${icon} text-sm`}></i>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white tracking-wide leading-snug">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Cerrar modal"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer */}
      </div>
    </div>
  );
}

const Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 md:col-span-2 sm:flex-row sm:justify-end">
      {children}
    </div>
  );
};

Modal.Footer = Footer;
