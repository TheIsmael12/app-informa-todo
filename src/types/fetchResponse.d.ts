/**
 * Respuesta genérica de fetch para cualquier endpoint de la API.
 * @property status - Código HTTP de la respuesta
 * @property data - Datos devueltos por la API (opcional)
 * @property error - Texto del error HTTP si la petición falló (opcional)
 * @property message - Mensaje descriptivo del resultado (opcional)
 */
type FetchResponse<T> = {
  status: number;
  data?: T;
  error?: string;
  message?: string;
};

/**
 * Respuesta paginada genérica de la API.
 * @property list - Array de elementos de la página actual
 * @property page - Número de página actual (base 1)
 * @property limit - Número de elementos por página
 * @property total - Total de elementos en la colección
 * @property totalPages - Total de páginas disponibles
 */
export interface PaginatedDataResponse<T> {
  list: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}