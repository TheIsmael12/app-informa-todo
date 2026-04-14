import { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import { Pathnames } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

import { ENV } from "@/constants/env";

type GenerateMetadataOptions = {
  locale: string;
  pathname: string;
  image?: { url: string };
};

const NAMESPACE_MAP: Record<string, string> = {
  "/": "Common",
};

function buildUrl(
  basePath: string,
  pathname: keyof Pathnames,
  locale: string,
): string {
  return `${basePath}${getPathname({
    href: pathname as Parameters<typeof getPathname>[0]["href"],
    locale,
  })}`;
}

export async function generateTranslatedMetadata({
  locale,
  pathname,
  image = { url: `/logo.svg` },
}: GenerateMetadataOptions): Promise<Metadata> {
  
  const namespace = `Metadata.${NAMESPACE_MAP[pathname] || "Common"}`;

  const t = await getTranslations({ locale, namespace });

  const baseUrl = (
    ENV.NEXT_PUBLIC_API_BASE_URL?.startsWith("http")
      ? ENV.NEXT_PUBLIC_API_BASE_URL
      : `https://${ENV.NEXT_PUBLIC_API_BASE_URL}`
  )?.replace(/\/$/, "");

  const normalizedPathname = pathname as keyof Pathnames;
  const isDynamic = pathname.includes("[");
  const canonicalUrl = buildUrl(baseUrl, normalizedPathname, locale);

  const title = t("title", { appName: ENV.APP_NAME });
  const description = t("description", { appName: ENV.APP_NAME });

  return {
    title,
    description,
    keywords: t("keywords", { appName: ENV.APP_NAME }),
    robots: "index, follow",
    publisher: "Ismael Benabdellah El Ouahabi",
    applicationName: ENV.APP_NAME,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    creator: "Ismael Benabdellah El Ouahabi",
    authors: [{ name: "Ismael Benabdellah El Ouahabi", url: "https://ismaelben.netlify.app/es" }],
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: isDynamic
        ? {
            "x-default": canonicalUrl,
            es: canonicalUrl,
            en: canonicalUrl,
            fr: canonicalUrl,
          }
        : {
            "x-default": canonicalUrl,
            es: buildUrl(baseUrl, normalizedPathname, "es"),
            en: buildUrl(baseUrl, normalizedPathname, "en"),
            fr: buildUrl(baseUrl, normalizedPathname, "fr"),
          },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      locale,
      siteName: ENV.APP_NAME,
      images: [
        {
          url: `${baseUrl}${image.url}`,
          secureUrl: `${baseUrl}${image.url}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: ENV.APP_NAME,
      title,
      description,
      images: [`${baseUrl}${image.url}`],
    },
  };
}
