import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

import { ThemeProvider } from 'next-themes'

import { setRequestLocale, getTranslations } from 'next-intl/server'
import { NextIntlClientProvider, hasLocale } from 'next-intl'

import Navbar from '@/components/navigations/Navbar'

import { routing } from '@/i18n/routing'
import { generateTranslatedMetadata } from '@/lib/generateMetadata'

import { Toaster } from 'sonner'

import { Fira_Sans, Inter } from 'next/font/google'

const fira = Fira_Sans({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-fira'
})

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-inter',
})

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {

    const { locale } = await params;
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '/';

    return generateTranslatedMetadata({ locale, pathname });

}

export default async function LocaleLayout({ children, params }: LayoutProps) {

    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'Navigation' });

    return (

        <html lang={locale} suppressHydrationWarning>
            <body className={`${fira.variable} ${inter.variable}`}>
                <ThemeProvider>
                    <NextIntlClientProvider>
                        <a href="#main-content" className="skip-to-content">
                            {t('skipToContent')}
                        </a>
                        <Toaster position="bottom-center" richColors />
                        <Navbar />
                        <main id="main-content" className='main'>
                            {children}
                        </main>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>

    )

}