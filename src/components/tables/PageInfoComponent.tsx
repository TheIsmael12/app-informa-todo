import { useTranslations } from "next-intl";

import { PageInfoComponentProps } from "@/types/tables";

export default function PageInfoComponent({
    currentPage,
    totalPages,
    total
}: PageInfoComponentProps) {

    const t = useTranslations('Tables');

    return (

        <div className='table__info'>
            {t('page')} <span>{currentPage}</span> {t('of')} <span>{totalPages}</span> {t('of')} <span>{total}</span> {t('records')}.
        </div>

    );
}
