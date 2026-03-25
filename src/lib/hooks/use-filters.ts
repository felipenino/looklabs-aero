"use client";

import { useState, useCallback, useMemo } from "react";

export interface FilterState {
  cores: string[];
  precoRange: string | null;
  tamanhos: string[];
  subcategorias: string[];
}

const INITIAL_FILTERS: FilterState = {
  cores: [],
  precoRange: null,
  tamanhos: [],
  subcategorias: [],
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const toggleCor = useCallback((cor: string) => {
    setFilters((prev) => ({
      ...prev,
      cores: prev.cores.includes(cor)
        ? prev.cores.filter((c) => c !== cor)
        : [...prev.cores, cor],
    }));
  }, []);

  const setPrecoRange = useCallback((range: string | null) => {
    setFilters((prev) => ({
      ...prev,
      precoRange: prev.precoRange === range ? null : range,
    }));
  }, []);

  const toggleTamanho = useCallback((tamanho: string) => {
    setFilters((prev) => ({
      ...prev,
      tamanhos: prev.tamanhos.includes(tamanho)
        ? prev.tamanhos.filter((t) => t !== tamanho)
        : [...prev.tamanhos, tamanho],
    }));
  }, []);

  const toggleSubcategoria = useCallback((sub: string) => {
    setFilters((prev) => ({
      ...prev,
      subcategorias: prev.subcategorias.includes(sub)
        ? prev.subcategorias.filter((s) => s !== sub)
        : [...prev.subcategorias, sub],
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const activeCount = useMemo(() => {
    let count =
      filters.cores.length +
      filters.tamanhos.length +
      filters.subcategorias.length;
    if (filters.precoRange) count++;
    return count;
  }, [filters]);

  const hasActiveFilters = activeCount > 0;

  return {
    filters,
    toggleCor,
    setPrecoRange,
    toggleTamanho,
    toggleSubcategoria,
    clearFilters,
    activeCount,
    hasActiveFilters,
  };
}
