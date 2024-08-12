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
      triages: response.data.triage,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      triages: [],
    };
  }
}

export async function fetchTriage(id: string): Promise<FetchProductsResponse> {
  try {
    const response = await axios.get<FetchProductsResponse>(
      `http://localhost:8080/get_triage/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // Verificação de status HTTP para erros
    if (response.status !== 200) {
      throw new Error(`Erro ao buscar a triagem: ${response.statusText}`);
    }

    const data = response.data;
    return data || { triages: [] };
  } catch (error) {
    console.error("Erro ao buscar triagem:", error);
    return {
      triages: [],
    };
  }
}
