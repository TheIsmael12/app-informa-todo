"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useFilters<K extends BaseFilters>(
  defaults: K,
): [K, (updates: Partial<BaseFilters>) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = {
    ...defaults,
    ...Object.fromEntries(searchParams.entries()),
  } as K;

  const setFilters = useCallback(
    (updates: Partial<BaseFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        const defaultValue = defaults[key as keyof K];
        const isEmpty =
          value === undefined ||
          value === null ||
          value === "" ||
          String(value) === String(defaultValue);

        if (isEmpty) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const query = params.toString();
      router.push(query ? `?${query}` : window.location.pathname);
    },
    [searchParams, router, defaults],
  );

  return [filters, setFilters];
}
