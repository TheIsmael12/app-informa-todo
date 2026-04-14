import Link from "next/link";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import Image from "next/image";

export default async function Error404() {

    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "es";

    const t = await getTranslations({ locale, namespace: 'Views.Error404' })

    return (

        <section className='notfound'>
            <Image
                src="/error_404B.svg"
                alt="Error 404"
                width={350}
                height={350}
            />
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
            <Link href="/" className='notfound__button'>
                {t('backToHome')}
            </Link>
        </section>

    )

}