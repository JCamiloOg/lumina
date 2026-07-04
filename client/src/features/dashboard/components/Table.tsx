// --------------------------------------------------------------------------
// Table — glassmorphic data table with sub-components
//
// Usage:
//   <Table
//     title="Gestión de productos"
//     subtitle="Lista de todos los productos registrados"
//     icon="fa-solid fa-box"
//     columns={["ID", "Nombre", "Precio", "Stock", "Acciones"]}
//     currentPage={1}
//     totalPages={5}
//     onPageChange={(p) => setPage(p)}
//   >
//     {products.map((p) => (
//       <Table.Row key={p.id}>
//         <Table.Cell>{p.id}</Table.Cell>
//         <Table.Cell>{p.name}</Table.Cell>
//         <Table.Cell variant="number">$ {p.price}</Table.Cell>
//         <Table.Cell variant="badge-success">{p.stock}</Table.Cell>
//         <Table.Cell variant="actions">
//           <button>Editar</button>
//         </Table.Cell>
//       </Table.Row>
//     ))}
//   </Table>
// --------------------------------------------------------------------------

type CellVariant =
  | "default"
  | "number"
  | "badge-success"
  | "badge-warning"
  | "badge-danger"
  | "badge-neutral"
  | "actions";

// ── Cell ──────────────────────────────────────────────────────────────────

interface CellProps {
  children: React.ReactNode;
  variant?: CellVariant;
  head?: boolean;
}

const variantStyles: Record<CellVariant, string> = {
  default: "text-slate-300",
  number: "text-violet-300 font-semibold tabular-nums",
  "badge-success":
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "badge-warning":
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20",
  "badge-danger":
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20",
  "badge-neutral":
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-400 border border-white/10",
  actions: "flex items-center gap-2 justify-end",
};

const Cell = ({ children, variant = "default", head = false }: CellProps) => {
  if (head) {
    return (
      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">
        {children}
      </th>
    );
  }

  const isBadge = variant.startsWith("badge");

  return (
    <td className="px-5 py-4">
      <span className={`text-sm ${variantStyles[variant]}`}>
        {isBadge ? (
          <span className={variantStyles[variant]}>{children}</span>
        ) : (
          children
        )}
      </span>
    </td>
  );
};

// ── Row ───────────────────────────────────────────────────────────────────

interface RowProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Row = ({ children, onClick }: RowProps) => (
  <tr
    onClick={onClick}
    className={`border-b border-white/5 transition-colors duration-200 hover:bg-white/2 ${onClick ? "cursor-pointer" : ""}`}
  >
    {children}
  </tr>
);

// ── Pagination ────────────────────────────────────────────────────────────

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  // Build visible page numbers (window of 5 centered on currentPage)
  const makePages = () => {
    const pages: (number | "...")[] = [];
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-white/5 bg-[#090D16]/80">
      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">
        Página{" "}
        <span className="text-violet-400 font-bold">{currentPage}</span> de{" "}
        <span className="text-violet-400 font-bold">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1 bg-[#0F1420]/40 border border-white/5 p-1.5 rounded-xl backdrop-blur-md">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Página anterior"
        >
          <i className="fa-solid fa-chevron-left text-[10px]" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-0.5">
          {makePages().map((p, idx) =>
            p === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="h-8 w-8 flex items-center justify-center text-slate-600 text-xs select-none"
              >
                •••
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 cursor-pointer ${p === currentPage
                  ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.35)] border border-violet-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Página siguiente"
        >
          <i className="fa-solid fa-chevron-right text-[10px]" />
        </button>
      </div>
    </div>
  );
};

// ── Table (main) ──────────────────────────────────────────────────────────

const LIMIT_OPTIONS = [5, 10, 20, 50] as const;

interface TableProps {
  title: string;
  subtitle?: string;
  icon?: string;
  columns: string[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Optional slot for action buttons (e.g. "Nuevo producto") */
  actions?: React.ReactNode;
  /** Search input — show by passing value + handler */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** Limit selector — show by passing value + handler */
  limitValue?: number;
  onLimitChange?: (limit: number) => void;
  children: React.ReactNode;
}

export default function Table({
  title,
  subtitle,
  icon = "fa-solid fa-table",
  columns,
  currentPage,
  totalPages,
  onPageChange,
  actions,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  limitValue,
  onLimitChange,
  children,
}: TableProps) {
  const showToolbar = !!(onSearchChange || onLimitChange);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090D16] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Top highlight line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-[-30%] right-[-10%] w-72 h-72 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

      {/* Table Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-6 py-5 border-b border-white/5 bg-[#090D16]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
            <i className={`${icon} text-sm`} />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-white tracking-wide">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Action slot */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Toolbar: search + limit — only renders when at least one is active */}
      {showToolbar && (
        <div className="relative z-10 flex flex-wrap items-center gap-3 px-6 py-4 border-b border-white/5 bg-white/1.5">
          {/* Search */}
          {onSearchChange && (
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                <i className="fa-solid fa-magnifying-glass text-xs" />
              </span>
              <input
                type="search"
                value={searchValue ?? ""}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-[#070A10]/60 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/15 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
              />
              {/* Clear button */}
              {searchValue && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  aria-label="Limpiar búsqueda"
                >
                  <i className="fa-solid fa-xmark text-xs" />
                </button>
              )}
            </div>
          )}

          {/* Limit */}
          {onLimitChange && (
            <div className="flex items-center gap-2 shrink-0">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Filas
              </label>
              <div className="relative">
                <select
                  value={limitValue}
                  onChange={(e) => onLimitChange(Number(e.target.value))}
                  className="appearance-none bg-[#070A10]/60 border border-white/10 rounded-xl py-2.5 pl-4 pr-8 text-sm font-semibold text-white focus:outline-hidden focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/15 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  {LIMIT_OPTIONS.map((n) => (
                    <option key={n} value={n} className="bg-[#0F1420]">
                      {n}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-slate-500">
                  <i className="fa-solid fa-chevron-down text-[9px]" />
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scrollable table wrapper */}
      <div className="relative z-10 overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              {columns.map((col) => (
                <Cell key={col} head>
                  {col}
                </Cell>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

// Attach sub-components as static properties for ergonomic usage
Table.Cell = Cell;
Table.Row = Row;