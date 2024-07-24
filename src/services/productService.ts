// services/productService.ts

import axios from "axios";

export async function fetchProducts(nome: string = "", situacao: string = "") {
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

    return {
      products: response.data,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      products: [],
    };
  }
}

export async function fetchProductsss(
  nome: string = "",
  situacao: string = "",
) {
  console.log("Fetching products with page fetchProducts:", nome, situacao);
  try {
    const response = await fetch(
      `http://localhost:8080/get_products?nome=${nome}&situacao=${situacao}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar os produtos");
    }
    const data = await response.json();
    const totalPages = 1;
    return {
      products: data,
      totalPages: totalPages,
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

export async function fetchProductsNoMovementPage(
  nome: string = "",
  situacao: string = "",
) {
  console.log(
    "Fetching products with page fetchProductsNoMovementPage:",
    nome,
    situacao,
  );
  try {
    const response = await fetch(
      `http://localhost:8080/get_products_no_movements`,
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar os produtos sem movimento");
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Erro ao buscar produtos sem movimento:", error);
    return [];
  }
}

export async function fetchProductsEmptyStockPage(
  nome: string = "",
  situacao: string = "",
) {
  console.log("Fetching products with page:", nome, situacao);
  try {
    const response = await fetch(
      `http://localhost:8080/get_products_empty_stock`,
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar os produtos com o estoque vazio");
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Erro ao buscar produtos com estoque vazio:", error);
    return [];
  }
}
