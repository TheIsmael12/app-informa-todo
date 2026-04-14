'use client'

import { useRef, useState, useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import { routing } from '@/i18n/routing'

import Image from 'next/image'

import { ChevronDownIcon, ChevronUpIcon, LoaderCircleIcon } from 'lucide-react'

const languageNames: Record<string, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ca: 'Català'
}

export default function Locale() {

    const t = useTranslations('Navigation.Locale')

    const locales = routing.locales

    const currentLocale = useLocale()
    const languageMenuRef = useRef<HTMLDivElement>(null);

    const [isUpdating, startTransition] = useTransition()
    const [menuLanguage, setMenuLanguage] = useState(false)

    const toggleMenu = () => setMenuLanguage(!menuLanguage)

    const handleLocaleChange = (locale: string) => {
        startTransition(() => {
            document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`
            window.location.reload()
        })
    }

    useOutsideClick(languageMenuRef, {
        onOutsideClick: () => setMenuLanguage(false),
        isActive: menuLanguage
    });

    return (

        <section>

            <button
                type='button'
                onClick={toggleMenu}
                aria-label={t('changeLanguageTo', { language: languageNames[currentLocale] ?? currentLocale })}
                title={t('changeLanguageTo', { language: languageNames[currentLocale] ?? currentLocale })}
                className='locale__button'
                disabled={isUpdating}
            >
                <div className='locale__button__content'>
                    {isUpdating ? (
                        <LoaderCircleIcon className="locale__loading" />
                    ) : (
                        <Image
                            src={`/locales/${currentLocale}.svg`}
                            alt={currentLocale}
                            height={20}
                            width={20}
                        />
                    )}
                    <p className="locale__button__text">
                        {languageNames[currentLocale] ?? currentLocale}
                    </p>
                </div>

                {menuLanguage ? <ChevronUpIcon /> : <ChevronDownIcon />}

            </button>

            {menuLanguage && (
                <div
                    role='menu'
                    className='locale__menu'
                    aria-orientation='vertical'
                    ref={languageMenuRef}
                >
                    {locales.filter((locale) => locale !== currentLocale).map((locale) => {
                        return (
                            <button
                                key={locale}
                                type="button"
                                role="menuitem"
                                className="locale__menu__item"
                                aria-label={t('changeLanguageTo', { language: languageNames[locale] ?? locale })}
                                onClick={() => handleLocaleChange(locale)}
                                disabled={isUpdating}
                            >
                                <Image
                                    src={`/locales/${locale}.svg`}
                                    alt={locale}
                                    aria-hidden="true"
                                    height={20}
                                    width={20}
                                    className='locale__flag'
                                />
                                <p>{languageNames[locale] ?? locale}</p>
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    )
}