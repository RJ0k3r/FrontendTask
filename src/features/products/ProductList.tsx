import React from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";
import Toolbar from "../../components/Toolbar";

export default function ProductList() {
  const {
    data,
    total,
    loading,
    error,
    page,
    limit,
    query,
    category,
    sort,
    setPage,
    setQuery,
    setCategory,
    setSort,
    refetch,
  } = useProducts(10);

  const raw = data ?? [];

  const sorted = React.useMemo(() => {
    const arr = [...raw];
    switch (sort) {
      case "price_asc":
        arr.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case "price_desc":
        arr.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case "name_asc":
        arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "name_desc":
        arr.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      default:
        // no extra sorting
        break;
    }
    return arr;
  }, [raw, sort]);

  const categories = Array.from(new Set(raw.map((p) => p.category).filter(Boolean) as string[]));

  return (
    <main className="app-wrapper">
      <div className="header-row">
        <h1>Products</h1>
        <div style={{ color: "#666", fontSize: 14 }}>{total ?? sorted.length} results</div>
      </div>

      <Toolbar
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
        sort={sort}
        onSort={setSort}
        categories={categories}
      />

      {loading && <div>Loading...</div>}
      {error && (
        <div>
          Something went wrong: {error} <button className="btn" onClick={refetch}>Retry</button>
        </div>
      )}
      {!loading && sorted.length === 0 && <div>No products found</div>}

      <div className="product-grid">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1} className={page<=1 ? "btn-disabled" : ""}>Prev</button>
        <div style={{alignSelf:"center"}}>{page}</div>
        <button onClick={() => setPage(page + 1)} className="btn">Next</button>
      </div>
    </main>
  );
}
