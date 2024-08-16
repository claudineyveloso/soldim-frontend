import axios from "axios";

interface FetchProductsTriageResponse {
  triages: any[];
}

export async function fetchTriages(): Promise<FetchProductsTriageResponse> {
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

export async function fetchTriage(id: string) {
  console.log("Fetching product with id:", id);
  try {
    const response = await fetch(`http://localhost:8080/get_triage/${id}`);

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar o produto da triagem: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Erro ao buscar produto da triagem no Services:", error);
    return null; // Retornar null em caso de erro
  }
}
