import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, Product } from "../../api/product";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(id)
      .then((p) => setProduct(p))
      .catch((e) => setError(e.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/products");
  };

  return (
    <main className="app-wrapper">
      <div style={{ marginBottom: 12 }}>
        <button onClick={handleBack} className="link-btn" aria-label="Back to products">
          ← Back
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {product && (
        <section style={{ background: "white", padding: 18, borderRadius: 10 }}>
          <h1>{product.name}</h1>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
            <div className="product-price">₹{product.price}</div>
            <div className="product-meta">{product.category}</div>
            <div className="product-meta">{product.inStock ? "In stock" : "Out of stock"}</div>
          </div>
          {product.description && <p>{product.description}</p>}
        </section>
      )}
    </main>
  );
}
