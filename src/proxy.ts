import { routing } from "@/i18n/routing";

import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Rutas sin archivos estáticos, favicon, api, docs ni rutas internas de Next.js
    "/((?!api|docs|_next|_vercel|favicon\\.ico|.*\\..*).*)",
  ],
}