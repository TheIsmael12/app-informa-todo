/**
 * Tipo para searchParams que recibe Next.js en los componentes de página.
 * Representa los parámetros de la URL como un objeto plano.
 */
type SearchParams = Record<
  string | string[] | number,
  string | string[] | number | boolean | undefined | null
>;

/**
 * Filtros base compartidos por todos los hooks de paginación.
 * @property page - Número de página actual
 * @property limit - Número de elementos por página
 * @property search - Texto de búsqueda libre
 */
interface BaseFilters {
  page?: string | number;
  limit?: string | number;
  search?: string;
}