import { useMemo, useState } from "react";
import { EyeIcon, PencilIcon, TrashBinIcon, ChevronLeftIcon, ArrowRightIcon } from "../../icons";

export type Column<T> = {
    header: string;
    accessor?: keyof T | ((row: T) => React.ReactNode);
    className?: string;
    width?: string;
    cell?: (row: T) => React.ReactNode;
};

export type DataTableProps<T> = {
    title?: string;
    data: T[];
    columns: Column<T>[];
    rowKey?: (row: T, index: number) => string | number;
    initialPageSize?: number;
    pageSizeOptions?: number[];
    searchable?: boolean;
    placeholder?: string;
    showActions?: boolean;
    selectableRows?: boolean;
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
};

export default function DataTable<T extends Record<string, any>>({
    title,
    data,
    columns,
    rowKey,
    initialPageSize = 5,
    pageSizeOptions = [5, 10, 20],
    searchable = true,
    placeholder = "Search...",
    showActions = true,
    selectableRows = true,
    onView,
    onEdit,
    onDelete,
}: DataTableProps<T>) {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [selected, setSelected] = useState<Set<string | number>>(new Set());

    const filtered = useMemo(() => {
        if (!query.trim()) return data;
        const q = query.toLowerCase();
        return data.filter((row) =>
            Object.values(row).some((v) => String(v ?? "").toLowerCase().includes(q))
        );
    }, [data, query]);

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, totalPages);
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, total);
    const pageRows = filtered.slice(startIdx, endIdx);

    function toggleAll(check: boolean) {
        if (check) {
            const newSet = new Set<string | number>(
                pageRows.map((r, i) => (rowKey ? rowKey(r, startIdx + i) : (r.id ?? startIdx + i)))
            );
            setSelected(newSet);
        } else {
            setSelected(new Set());
        }
    }

    function toggleOne(key: string | number) {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            {title && (
                <div className="px-5 pt-5 sm:px-6 sm:pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h3>
                </div>
            )}

            {/* Controls row */}
            <div className="px-5 pb-3 sm:px-6 sm:pb-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        Show
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPage(1);
                            }}
                            className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm outline-none dark:border-gray-700 dark:bg-transparent"
                        >
                            {pageSizeOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                        entries
                    </div>
                    {searchable && (
                        <div className="w-full sm:w-72 pt-3 sm:pb-3">
                            <input
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setPage(1);
                                }}
                                placeholder={placeholder}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none ring-0 focus:border-brand-500 dark:border-gray-800 dark:bg-transparent"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                    <thead>
                        <tr className="border-y border-gray-200 bg-gray-50 text-left text-gray-700 dark:border-gray-800 dark:bg-white/[0.02] dark:text-gray-300">
                            {selectableRows && (
                                <th className="w-10 px-4 py-3">
                                    <input
                                        type="checkbox"
                                        aria-label="Select all"
                                        onChange={(e) => toggleAll(e.target.checked)}
                                    />
                                </th>
                            )}
                            {columns.map((col, idx) => (
                                <th key={idx} className={`px-4 py-3 font-medium ${col.className ?? ""}`} style={{ width: col.width }}>
                                    {col.header}
                                </th>
                            ))}
                            {showActions && <th className="px-4 py-3 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map((row, i) => {
                            const key = rowKey ? rowKey(row, startIdx + i) : (row.id ?? startIdx + i);
                            const checked = selected.has(key);
                            return (
                                <tr
                                    key={String(key)}
                                    className="border-b border-gray-100 text-gray-700 dark:border-gray-800 dark:text-gray-300"
                                >
                                    {selectableRows && (
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => toggleOne(key)}
                                                aria-label={`Select row ${i + 1}`}
                                            />
                                        </td>
                                    )}
                                    {columns.map((col, cidx) => (
                                        <td key={cidx} className={`px-4 py-3 ${col.className ?? ""}`}>
                                            {col.cell
                                                ? col.cell(row)
                                                : typeof col.accessor === "function"
                                                    ? col.accessor(row)
                                                    : String(col.accessor ? row[col.accessor as keyof T] ?? "" : "")}
                                        </td>
                                    ))}
                                    {showActions && (
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-3">
                                                {onView && (
                                                    <button
                                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/10"
                                                        onClick={() => onView(row)}
                                                        aria-label="View"
                                                    >
                                                        <EyeIcon className="size-4" />
                                                    </button>
                                                )}
                                                {onEdit && (
                                                    <button
                                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/10"
                                                        onClick={() => onEdit(row)}
                                                        aria-label="Edit"
                                                    >
                                                        <PencilIcon className="size-4" />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        className="p-1 rounded hover:bg-gray-100 text-red-600 dark:hover:bg-white/10"
                                                        onClick={() => onDelete(row)}
                                                        aria-label="Delete"
                                                    >
                                                        <TrashBinIcon className="size-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}

                        {pageRows.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + 2} className="px-4 py-8 text-center text-gray-500">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination footer */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between px-5 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-800">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {total === 0 ? 0 : startIdx + 1} to {endIdx} of {total} entries
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-sm disabled:opacity-50 dark:border-gray-700 dark:bg-transparent"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        aria-label="Previous"
                    >
                        <ChevronLeftIcon className="size-4" />
                    </button>
                    {Array.from({ length: totalPages }).map((_, idx) => {
                        const p = idx + 1;
                        const active = p === currentPage;
                        return (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`h-8 w-8 rounded-md border text-sm ${active
                                    ? "border-brand-500 bg-brand-50 text-brand-600"
                                    : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-transparent dark:text-gray-300"
                                    }`}
                                aria-current={active ? "page" : undefined}
                            >
                                {p}
                            </button>
                        );
                    })}
                    <button
                        className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-sm disabled:opacity-50 dark:border-gray-700 dark:bg-transparent"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="Next"
                    >
                        <ArrowRightIcon className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
