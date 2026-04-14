"use client";

import { useCallback, useMemo } from "react";

import { DEFAULT_PAGE, DEFAULT_SIZE } from "@/constants/filters";
import { useFilters } from "@/hooks/useFilters";

/**
 * Hook para manejar la paginación de tablas
 * Retorna el estado de paginación y la función para actualizarlo
 *
 * @param section Sección de filtros a utilizar
 * @returns { pagination, onPaginationChange, filters }
 */
export default function usePagination<K extends BaseFilters>(section: K) {
  const [filters, setFilters] = useFilters(section);

  // Estado de paginación (formato compatible con API - base 1)
  const pagination = useMemo(() => {
    const page = Number(filters.page) || DEFAULT_PAGE;
    const limit = Number(filters.limit) || DEFAULT_SIZE;

    return { page, limit };
  }, [filters.page, filters.limit]);

  // Handler para cambios de paginación
  const onPaginationChange = useCallback(
    (updater: { page?: number | string; limit?: number | string }) => {
      const updates: Partial<{ page: number; limit: number }> = {};

      if (updater.page !== undefined) {
        updates.page = Number(updater.page);
      }

      if (updater.limit !== undefined) {
        updates.limit = Number(updater.limit);
      }

      setFilters(updates);
    },
    [setFilters],
  );

  return { pagination, onPaginationChange, filters };
}
