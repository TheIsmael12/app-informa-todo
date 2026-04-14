
import { useTranslations } from 'next-intl'

import { PaginationComponentProps } from '@/types/tables'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange
}: PaginationComponentProps) {

    const t = useTranslations('Tables')

    const generatePageNumbers = () => {
        const maxPagesToShow = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1)
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    }

    return (

        <section className="table__pagination">
            <button
                type="button"
                onClick={() => onPageChange(1)}
                className={`table__pagination__item ${currentPage === 1 ? 'table__pagination__item__disabled' : ''}`}
                disabled={currentPage === 1}
                aria-label={t('firstPage')}
            >
                <ChevronsLeft size={16} />
            </button>
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                className={`table__pagination__item ${currentPage === 1 ? 'table__pagination__item__disabled' : ''}`}
                disabled={currentPage === 1}
                aria-label={t('previousPage')}
            >
                <ChevronLeft size={16} />
            </button>
            {generatePageNumbers().map(pageNumber => (
                <button
                    key={pageNumber}
                    className={`table__pagination__item ${pageNumber === currentPage ? 'table__pagination__item__active' : ''}`}
                    type="button"
                    onClick={() => onPageChange(pageNumber)}
                    aria-label={t('goToPage', { pageNumber })}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                className={`table__pagination__item ${currentPage === totalPages ? 'table__pagination__item__disabled' : ''}`}
                disabled={currentPage === totalPages}
                aria-label={t('nextPage')}
            >
                <ChevronRight size={16} />
            </button>
            <button
                type="button"
                onClick={() => onPageChange(totalPages)}
                className={`table__pagination__item ${currentPage === totalPages ? 'table__pagination__item__disabled' : ''}`}
                disabled={currentPage === totalPages}
                aria-label={t('lastPage')}
            >
                <ChevronsRight size={16} />
            </button>
        </section>

    )

}