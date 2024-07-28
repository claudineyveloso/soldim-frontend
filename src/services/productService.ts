// services/productService.ts

import axios from "axios";

interface FetchProductsResponse {
  products: any[];
}

export async function fetchProducts(
  nome: string = "",
  situacao: string = "",
): Promise<FetchProductsResponse> {
  console.log("Fetching products with nome:", nome, "situacao:", situacao);
  try {
    const response = await axios.get("http://localhost:8080/get_products", {
      params: {
        nome: nome,
        situacao: situacao,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    return {
      products: response.data.products,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      products: [],
    };
  }
}

export async function fetchProduct(id: number) {
  console.log("Fetching product with id:", id);
  try {
    const response = await fetch(`http://localhost:8080/get_product/${id}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar o produto: ${response.statusText}`);
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null; // Retornar null em caso de erro
  }
}

export async function fetchProductsByPage(
  nome: string = "",
  situacao: string = "",
) {
  console.log(
    "Fetching products with page fetchProductsByPage:",
    nome,
    situacao,
  );
  try {
    const response = await fetch(
      `http://localhost:8080/get_products?nome=${nome}&situacao=${situacao}`,
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

export const fetchProductsNoMovements = async (
  nome: string = "",
  situacao: string = "",
  limit: number = 10,
  offset: number = 0,
): Promise<FetchProductsResponse> => {
  console.log(
    "Fetching products with fetchProductsNoMovements:",
    nome,
    situacao,
    limit,
    offset,
  );
  try {
    const response = await axios.get(
      `http://localhost:8080/get_products_no_movements`,
      {
        params: {
          nome: nome,
          situacao: situacao,
          limit: limit,
          offset: offset,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      products: response.data.products,
      totalCount: response.data.total_count,
      page: offset / limit + 1,
      pageSize: limit,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos sem movimento:", error);
    return {
      products: [],
      totalCount: 0,
      page: 1,
      pageSize: limit,
    };
  }
};

export async function fetchProductsEmptyStock(
  nome: string = "",
  situacao: string = "",
  limit: number = 10,
  offset: number = 0,
): Promise<FetchProductsResponse> {
  console.log(
    "Fetching products with page fetchProductsEmptyStockPage:",
    nome,
    situacao,
    limit,
    offset,
  );
  try {
    const response = await axios.get(
      `http://localhost:8080/get_products_empty_stock`,
      {
        params: {
          nome: nome,
          situacao: situacao,
          limit: limit,
          offset: offset,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return {
      products: response.data.products,
      totalCount: response.data.total_count,
      page: offset / limit + 1,
      pageSize: limit,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos com estoque vazio:", error);
    return {
      products: [],
      totalCount: 0,
      page: 1,
      pageSize: limit,
    };
  }
}
