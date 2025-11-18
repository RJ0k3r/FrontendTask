import React from "react";
import { Product } from "../api/product";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card" style={{border:"1px solid #ddd",padding:12,borderRadius:8}}>
      <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
      <div>Category: {product.category ?? "—"}</div>
      <div>Price: ₹{product.price}</div>
      <div>{product.inStock ? "In stock" : "Out of stock"}</div>
    </article>
  );
}
