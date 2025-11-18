import React from "react";

export default function Pagination({
  page,
  total,
  limit,
  onPage,
}: {
  page: number;
  total: number;
  limit: number;
  onPage: (p: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / limit));
  return (
    <nav aria-label="Pagination" style={{marginTop:12}}>
      <button onClick={()=>onPage(page-1)} disabled={page<=1}>Prev</button>
      <span style={{margin:"0 8px"}}>{page} / {pages}</span>
      <button onClick={()=>onPage(page+1)} disabled={page>=pages}>Next</button>
    </nav>
  );
}
