import axios from "axios";

export async function fetchSalesOrders(nome: string = "") {
  console.log("Fetching sales orders with nome:", nome, "situacao:");
  try {
    const response = await axios.get("http://localhost:8080/get_sales_orders", {
      params: {
        nome: nome,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      salesOrders: response.data,
    };
  } catch (error) {
    console.error("Erro ao buscar as vendas dos produtos:", error);
    return {
      products: [],
    };
  }
}
