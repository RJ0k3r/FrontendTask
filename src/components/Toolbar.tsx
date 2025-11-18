import React, { useState, useEffect } from "react";

export default function Toolbar({
  query,
  onQuery,
  category,
  onCategory,
  sort,
  onSort,
  categories = [],
}: {
  query: string;
  onQuery: (q: string) => void;
  category: string;
  onCategory: (c: string) => void;
  sort: string;
  onSort: (s: string) => void;
  categories?: string[];
}) {
  const [local, setLocal] = useState(query || "");
  useEffect(() => setLocal(query || ""), [query]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (local !== query) {
        onQuery(local);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [local, onQuery, query]);

  return (
    <div className="toolbar" role="region" aria-label="Product filters">
      <label>
        <span>Search</span>
        <input aria-label="Search products" value={local} onChange={(e) => setLocal(e.target.value)} />
      </label>

      <label>
        <span>Category</span>
        <select value={category} onChange={(e) => onCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Sort</span>
        <select value={sort} onChange={(e) => onSort(e.target.value)}>
          <option value="">Default</option>
          <option value="price_asc">Price Low to High</option>
          <option value="price_desc">Price High to Low</option>
          <option value="name_asc">Name A→Z</option>
          <option value="name_desc">Name Z→A</option>
        </select>
      </label>
    </div>
  );
}
