import { defineRouting } from "next-intl/routing";

export const locales = ["es", "en", "fr", "ca"] as const;

// Rutas estáticas
export const pathnames = {
  "/": "/",
} as const;

export type Pathnames = typeof pathnames;
export type Locales = (typeof locales)[number];

export const routing = defineRouting({
  locales: locales,
  defaultLocale: "es",
  localePrefix: {
    mode: "never",
  },
  pathnames,
});
