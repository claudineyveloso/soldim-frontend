import axios from "axios";
import baseURL from "@/utils/config";

interface FetchDepositProductsResponse {
  depositProducts: any[];
}

export async function fetchDepositProductByProduct(
  id: number,
): Promise<FetchDepositProductsResponse> {
  try {
    const response = await axios.get(
      `${baseURL}/get_deposit_product_by_productID/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status !== 200) {
      throw new Error(
        `Erro ao buscar o depósito do produto no Service: ${response.statusText}`,
      );
    }
    return {
      depositProducts: response.data,
    };
  } catch (error) {
    return {
      depositProducts: [],
    };
  }
}
