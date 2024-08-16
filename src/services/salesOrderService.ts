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
      salesOrders: response.data.sales_orders,
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

export async function fetchSalesOrder(id: number) {
  console.log("Fetching product with id:", id);
  try {
    const response = await fetch(`http://localhost:8080/get_sales_order/${id}`);

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar o pedido de vendas: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Erro ao buscar pedido de vendas no Services:", error);
    return null; // Retornar null em caso de erro
  }
}
