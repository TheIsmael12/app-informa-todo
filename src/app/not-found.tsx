import { cookies } from 'next/headers';
import { Fira_Sans, Inter } from 'next/font/google';

import { Toaster } from 'sonner';

import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';

import Navbar from '@/components/navigations/Navbar';
import Error404 from '@/components/navigations/Error404';

const fira = Fira_Sans({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-fira',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-inter',
});

export default async function GlobalNotFound() {

    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value ?? 'es';

    return (

        <html lang={locale} suppressHydrationWarning>
            <body className={`${fira.variable} ${inter.variable}`}>
                <ThemeProvider>
                    <NextIntlClientProvider>
                        <Toaster position="bottom-center" richColors />
                        <Navbar />
                        <main id="main-content" className='main'>
                            <Error404 />
                        </main>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>

    );

}