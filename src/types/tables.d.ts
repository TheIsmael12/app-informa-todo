/**
 * Estado de paginación compartido entre tabla y API.
 * @property page - Página actual (base 1)
 * @property limit - Elementos por página
 * @property totalPages - Total de páginas
 * @property total - Total de elementos en la colección
 */
export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

/**
 * Props para el componente de información de página.
 * @property currentPage - Página actualmente visible
 * @property totalPages - Total de páginas disponibles
 * @property total - Total de elementos en la colección
 */
export interface PageInfoComponentProps {
    currentPage: number;
    totalPages: number;
    total: number;
}

/**
 * Props para el componente de navegación entre páginas.
 * @property currentPage - Página actualmente activa
 * @property totalPages - Total de páginas disponibles
 * @property onPageChange - Callback que recibe el número de página seleccionado
 */
export interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

/**
 * Props para el selector de filas por página.
 * @property rows - Número de filas actualmente seleccionado (opcional)
 * @property total - Total de elementos disponibles (opcional)
 * @property onRowChange - Callback que recibe el nuevo número de filas por página
 */
export interface SelectRowsProps {
    rows?: number;
    total?: number;
    onRowChange: (newRows: number) => void;
}

/**
 * Props para el componente de lista genérico con paginación.
 * @property data - Array de elementos a renderizar
 * @property renderCard - Función que renderiza cada elemento como un nodo React
 * @property pagination - Estado de paginación actual
 * @property onPaginationChange - Callback al cambiar página o límite
 * @property className - Clase CSS del contenedor de la lista (opcional)
 * @property getRowId - Función para obtener un id único por fila (opcional)
 */
export interface ListComponentProps<TData> {
  data: TData[];
  renderCard: (item: TData, index: number) => ReactNode;
  pagination: Pagination;
  onPaginationChange: (pagination: { page: number; limit?: number }) => void;
  className?: string;
  getRowId?: (row: TData) => string;
}