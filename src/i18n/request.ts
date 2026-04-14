import { routing } from "@/i18n/routing";

import { hasLocale } from "next-intl";
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

// Import estático por locale - solo un import por idioma
async function loadMessages(locale: string) {
  switch (locale) {
    case "es":
      return (await import("@/i18n/locales/es")).default;
    case "en":
      return (await import("@/i18n/locales/en")).default;
    case "fr":
      return (await import("@/i18n/locales/fr")).default;
    case "ca":
      return (await import("@/i18n/locales/ca")).default;
    default:
      return (await import("@/i18n/locales/es")).default;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Obtener el locale de la cookie primero
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  // Prioridad: 1) Cookie del usuario autenticado, 2) Request locale, 3) Default
  const requested = cookieLocale || (await requestLocale);
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
