/**
 * @file processSerchParams.ts
 * @description Función para procesar los parámetros de búsqueda y convertirlos en una cadena de consulta URL.
 * @param params - Objeto que contiene los parámetros de búsqueda (page, limit, search).
 * @returns 
 */

export const processSearchParams = (params: SearchParams): string => {
  const q = new URLSearchParams();
  if (params.page !== undefined) q.set("page", String(params.page));
  if (params.limit !== undefined) q.set("limit", String(params.limit));
  if (params.search !== undefined && params.search !== null) {
    const search = Array.isArray(params.search)
      ? params.search[0]
      : String(params.search);
    if (search) q.set("search", search);
  }
  return q.toString();
};
