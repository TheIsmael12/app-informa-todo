'use client'

import PageInfoComponent from '@/components/tables/PageInfoComponent'
import PaginationComponent from '@/components/tables/PaginationComponent'
import RowsPerPageSelectComponent from '@/components/tables/RowPerPageSelectComponent'

import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/filters'

import { ListComponentProps } from '@/types/tables'

export default function ListComponent<TData extends object>({
    data,
    renderCard,
    pagination,
    onPaginationChange,
    className = 'list__grid',
    getRowId
}: ListComponentProps<TData>) {

    const getDefaultRowId = (row: TData, index: number): string => {
        if (getRowId) return getRowId(row)
        if ('id' in row && typeof row.id === 'string') return row.id
        return String(index)
    }

    const handlePageChange = (newPage: number) => {
        onPaginationChange({
            page: newPage
        })
    }

    const handleLimitChange = (newLimit: number) => {
        onPaginationChange({
            page: DEFAULT_PAGE,
            limit: newLimit || DEFAULT_SIZE
        })
    }

    return (

        <>
            <section className={className}>
                {data.map((item, index) => (
                    <div key={getDefaultRowId(item, index)}>
                        {renderCard(item, index)}
                    </div>
                ))}
            </section>

            <section className="table__footer">

                <PageInfoComponent
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    total={pagination.total}
                />

                <PaginationComponent
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                />

                <RowsPerPageSelectComponent
                    total={pagination.total}
                    rows={pagination.limit}
                    onRowChange={handleLimitChange}
                />

            </section>

        </>

    )

}
