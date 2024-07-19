// services/productService.ts
export async function fetchProducts(nome: string = "", situacao: string = "") {
  console.log("Fetching products with page:", nome, situacao);
  try {
    const response = await fetch(
      `http://localhost:8080/get_products?nome=${name}&situacao=${situacao}`,
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
  console.log("Fetching products with page:", nome, situacao);
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
