// services/productService.ts
import axios from "axios";
import baseURL from "@/utils/config";

interface FetchProductsResponse {
  products: any[];
}

export async function fetchProducts(
  nome: string = "",
  situacao: string = "",
): Promise<FetchProductsResponse> {
  console.log("Fetching products with nome:", nome, "situacao:", situacao);
  try {
    const response = await axios.get(`${baseURL}/get_products`, {
      params: {
        nome: nome,
        situacao: situacao,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Erro ao buscar produtos no Service: ${response.statusText}`,
      );
    }

    return {
      products: response.data.products,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos no Services:", error);
    return {
      products: [],
    };
  }
}

export async function fetchProduct(id: number) {
  console.log("Fetching product with id:", id);
  try {
    const response = await fetch(`${baseURL}/get_product/${id}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar o produto: ${response.statusText}`);
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Erro ao buscar produto no Services:", error);
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
      `${baseURL}/get_products?nome=${nome}&situacao=${situacao}`,
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
): Promise<FetchProductsResponse> => {
  console.log(
    "Fetching products with fetchProductsNoMovements:",
    nome,
    situacao,
  );
  try {
    const response = await axios.get(`${baseURL}/get_products_no_movements`, {
      params: {
        nome: nome,
        situacao: situacao,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Erro ao buscar produtos sem movimento: ${response.statusText}`,
      );
    }

    return {
      products: response.data.products,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos sem movimento:", error);
    return {
      products: [],
    };
  }
};

export async function fetchProductsEmptyStock(
  nome: string = "",
  situacao: string = "",
): Promise<FetchProductsResponse> {
  console.log(
    "Fetching products with page fetchProductsEmptyStockPage:",
    nome,
    situacao,
  );
  try {
    const response = await axios.get(`${baseURL}/get_products_empty_stock`, {
      params: {
        nome: nome,
        situacao: situacao,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Erro ao buscar produtos com estoque vazio: ${response.statusText}`,
      );
    }

    return {
      products: response.data.products,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos com estoque vazio:", error);
    return {
      products: [],
    };
  }
}

export const deleteProduct = async (id: number) => {
  try {
    const response = await fetch(`${baseURL}/delete_product/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar o produto");
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar o produto:", error);
    return false;
  }
};

export const createProduct = async (product: any) => {
  try {
    const response = await fetch(`${baseURL}/create_product_bling`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      let errorMessage = "Erro ao criar o produto";

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.message || errorMessage;
        } catch (jsonError) {
          console.error("Erro ao decodificar JSON:", jsonError);
          errorMessage = "Resposta da API não é um JSON válido.";
        }
      } else {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }

      console.error("Erro ao criar o produto:", errorMessage);
      throw new Error(errorMessage);
    }

    return true;
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    return false;
  }
};

export const updateProduct = async (product: any) => {
  try {
    const response = await fetch(
      `${baseURL}/update_product_bling?productID=${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      },
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar o produto");
    }

    return true;
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    return false;
  }
};
