'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

export default function Theme() {

    const t = useTranslations('Navigation.ThemeToggle')

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return (
            <section className="theme theme--skeleton">
                <div className="theme__item" />
                <div className="theme__item" />
                <div className="theme__item" />
            </section>
        );
    }

    const themeOptions = [
        { key: 'light', icon: <SunIcon size={18} />, label: t('lightMode') },
        { key: 'system', icon: <MonitorIcon size={18} />, label: t('systemMode') },
        { key: 'dark', icon: <MoonIcon size={18} />, label: t('darkMode') },
    ];

    return (
        <section className="theme">
            {themeOptions.map(({ key, icon, label }) => {
                const isActive = theme === key;
                return (
                    <button
                        key={key}
                        className={`theme__item ${isActive ? 'theme__item--active' : ''}`}
                        onClick={() => setTheme(key)}
                        title={t(`toggleTheme`, { theme: label })}
                        aria-label={t(`toggleTheme`, { theme: label })}
                        aria-pressed={isActive}
                    >
                        {icon}
                    </button>
                );
            })}
        </section>
    );
}