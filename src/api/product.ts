export type Product = {
  id: string;
  name: string;
  price: number;
  category?: string;
  inStock?: boolean;
  description?: string;
  image?: string;
};

async function parseProductsResponse(resp: Response) {
  if (!resp.ok) throw new Error(`Failed to fetch (${resp.status})`);
  const body = await resp.json();
  let data: any[] = [];
  let total: number | undefined = undefined;

  if (Array.isArray(body)) {
    data = body;
    total = body.length;
  } else if (body.data && Array.isArray(body.data)) {
    data = body.data;
    total = body.total ?? body.data.length;
  } else if (body.products && Array.isArray(body.products)) {
    data = body.products;
    total = body.total ?? body.products.length;
  } else if (body.items && Array.isArray(body.items)) {
    data = body.items;
    total = body.total ?? body.items.length;
  } else {
    const firstArray = Object.values(body).find(v => Array.isArray(v));
    if (firstArray) {
      data = firstArray as any[];
      total = body.total ?? data.length;
    } else {
      data = [];
      total = 0;
    }
  }

  return { data, total: Number(total ?? data.length) };
}

export async function fetchProducts({
  query,
  category,
  page = 1,
  limit = 10,
  sort,
}: {
  query?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
}) {
  const qs = new URLSearchParams();
  if (query) qs.set("query", query);
  if (category) qs.set("category", category);
  qs.set("page", String(page));
  qs.set("limit", String(limit));
  if (sort) qs.set("sort", sort);

  const res = await fetch(`/products?${qs.toString()}`);
  return parseProductsResponse(res); // returns { data, total }
}

export async function fetchProductById(id: string) {
  const res = await fetch(`/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product (${res.status})`);
  return res.json();
}
