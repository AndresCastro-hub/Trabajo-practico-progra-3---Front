import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    current: number
    lastPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({ current, lastPage, onPageChange }: PaginationProps) {

    const getPages = () => {
        if (lastPage <= 5) return Array.from({ length: lastPage }, (_, i) => i + 1)
        if (current <= 3) return [1, 2, 3, 4]
        if (current >= lastPage - 2) return [lastPage - 3, lastPage - 2, lastPage - 1, lastPage]
        return [current - 1, current, current + 1]
    }

    const pages = getPages()
    const showStartEllipsis = lastPage > 5 && pages[0] > 1
    const showEndEllipsis = lastPage > 5 && pages[pages.length - 1] < lastPage

    return (
        <div className="flex items-center justify-center gap-1 py-8">

            <button
                disabled={current === 1}
                onClick={() => onPageChange(current - 1)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {showStartEllipsis && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        1
                    </button>
                    <span className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">...</span>
                </>
            )}

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        p === current
                            ? "bg-green-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    {p}
                </button>
            ))}

            {showEndEllipsis && (
                <>
                    <span className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">...</span>
                    <button
                        onClick={() => onPageChange(lastPage)}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        {lastPage}
                    </button>
                </>
            )}

            <button
                disabled={current === lastPage}
                onClick={() => onPageChange(current + 1)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-4 h-4" />
            </button>

        </div>
    )
}