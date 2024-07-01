// services/productService.ts
export async function fetchProducts(
  page: number,
  limit: number = 100,
  name: string = "",
  criterio: number = 0,
) {
  console.log(
    "Fetching products with page:",
    page,
    "limit:",
    limit,
    "and name:",
    name,
    criterio,
  );
  try {
    const response = await fetch(
      `http://localhost:8080/get_products?page=${page}&limit=${limit}&name=${name}&criterio=${criterio}`,
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar os produtos");
    }
    const data = await response.json();
    return {
      products: data.products,
      totalPages: data.totalPages,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      products: [],
      totalPages: 0,
    };
  }
}

export async function fetchProductsByPage(
  page: number,
  limit: number = 100,
  name: string = "",
  criterio: number = 0,
) {
  console.log(
    "Fetching products with page:",
    page,
    "limit:",
    limit,
    "and name:",
    name,
    criterio,
  );
  try {
    const response = await fetch(
      `http://localhost:8080/get_products?page=${page}&limit=${limit}&name=${name}&criterio=${criterio}`,
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar os produtos");
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}
