export const ENV = {
  PORT: process.env.PORT || 3000,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",

  // Información de la aplicación
  APP_NAME: process.env.NEXT_PUBLIC_INFO_APP_NAME || "App",
  APP_VERSION: process.env.NEXT_PUBLIC_INFO_APP_VERSION || "1.0.0",
};
