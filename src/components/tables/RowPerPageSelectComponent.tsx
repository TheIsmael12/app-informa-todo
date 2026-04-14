'use client'

import { useState } from 'react'

import SelectComponent from '@/components/ui/inputs/SelectComponent';

import { SelectRowsProps } from '@/types/tables';
import { DEFAULT_SIZE } from '@/constants/filters';

export default function RowsPerPageSelectComponent({
    rows,
    total,
    onRowChange
}: SelectRowsProps) {

    const [rowsNumber, setRowsNumber] = useState<number>(rows ?? DEFAULT_SIZE)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value)
        setRowsNumber(selectedValue)
        onRowChange(selectedValue)
    }

    const availableOptions = !total || total === 0
        ? [10]
        : [10, 20, 30].filter((option) => option <= total || option === Math.min(...[10, 20, 30].filter(o => o > total)))

    return (

        <section className="table__rows-per-page">
            <SelectComponent
                id="rows-per-page"
                name="rows-per-page"
                label='rowsPerPage'
                value={rowsNumber.toString()}
                options={availableOptions.map((num) => ({
                    value: num.toString(),
                    label: num.toString(),
                }))}
                onChange={handleChange}
                noTranslation
            />
        </section>
    )

}