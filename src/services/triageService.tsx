import axios from "axios";

interface FetchProductsResponse {
  triages: any[];
}

export async function fetchTriages(): Promise<FetchProductsResponse> {
  console.log("Fetching triages with nome:");
  try {
    const response = await axios.get("http://localhost:8080/get_triages", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      triages: response.data.triages,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      triages: [],
    };
  }
}
