import axios from "axios";

interface FetchProductsResponse {
  products: any[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export async function fetchProducts(
  nome: string = "",
  limit: number = 10,
  offset: number = 0,
): Promise<FetchProductsResponse> {
  console.log("Fetching products with nome:", nome);
  try {
    const response = await axios.get("http://localhost:8080/get_triages", {
      params: {
        nome: nome,
        limit: limit,
        offset: offset,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      products: response.data.products,
      totalCount: response.data.total_count,
      page: offset / limit + 1,
      pageSize: limit,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      products: [],
      totalCount: 0,
      page: 1,
      pageSize: limit,
    };
  }
}
