import SalesOrders from "@/app/sales_orders/page";
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
      SalesOrders: [],
    };
  }
}

export async function fetchProductsSalesOrders() {
  try {
    const response = await axios.get(
      "http://localhost:8080/get_products_sales_orders",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Fetching products sales orders", response.data);
    return {
      salesOrders: response.data,
    };
  } catch (error) {
    console.error("Erro ao buscar as vendas dos produtos:", error);
    return {
      salesOrders: [],
    };
  }
}
