import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, Product } from "../api/product";

export function useProducts(defaultLimit = 10) {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const category = searchParams.get("category") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? defaultLimit);
  const sort = searchParams.get("sort") ?? "";

  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetchProducts({ query, category, page, limit, sort });
      setData(resp.data);
      setTotal(resp.total ?? resp.data.length);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [query, category, page, limit, sort]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const updateParams = (next: { [k: string]: string | number | null }) => {
    const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
    Object.entries(next).forEach(([k, v]) => {
      if (v === null || v === "") params.delete(k);
      else params.set(k, String(v));
    });
    setSearchParams(params);
  };

  return {
    data,
    total,
    loading,
    error,
    page,
    limit,
    query,
    category,
    sort,
    setPage: (p: number) => updateParams({ page: p }),
    setQuery: (q: string) => updateParams({ query: q, page: 1 }),
    setCategory: (c: string) => updateParams({ category: c, page: 1 }),
    setSort: (s: string) => updateParams({ sort: s }),
    refetch: fetch,
  };
}
