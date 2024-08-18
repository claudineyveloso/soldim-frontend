// services/searchService.ts

import baseURL from "@/utils/config";
import axios from "axios";

interface SearchResultSource {
  source: string;
  search_id: string;
}

interface FetchSearchesResultResponse {
  searchesResult: any[];
}

export async function fetchSearchesResult(
  source: string = "",
): Promise<FetchSearchesResultResponse> {
  try {
    const response = await axios.get(`${baseURL}/get_searches_result`, {
      params: {
        source: source,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verificar o status da resposta
    if (response.status !== 200) {
      console.error("Resposta da API com status inválido:", response.status);
      throw new Error(`Resposta inválida da API: ${response.status}`);
    }

    // Verificar os dados da resposta
    const data = response.data;
    if (!data) {
      console.error("Nenhum dado retornado pela API");
      throw new Error("Nenhum dado retornado pela API");
    }

    // Log da resposta para depuração
    console.log("Resposta da API:", data);

    return {
      searchesResult: data.search_results,
    };
  } catch (error) {
    console.error("Erro ao buscar o resultado da busca:", error);
    return {
      searchesResult: [],
    };
  }
}

export async function fetchSearchesResultSource(
  searchID: string = "",
): Promise<SearchResultSource[]> {
  try {
    const response = await axios.get(
      `${baseURL}/get_search_result_sources/${searchID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // Verificar o status da resposta
    console.log("API response status:", response.status); // Adicione log para depuração
    if (response.status !== 200) {
      throw new Error("Erro ao buscar resultados da pesquisa");
    }

    // Extrair dados da resposta
    const data = response.data;
    console.log("Data from API dos sourceID:", data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar resultados da pesquisa:", error);
    return [];
  }
}

export const deleteSearchResult = async (id: string) => {
  try {
    const response = await fetch(`${baseURL}/delete_search_result/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar resultado da busca");
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar resultado da busca:", error);
    return false;
  }
};

export const fetchSearchResult = async (searchResultID: string) => {
  try {
    const response = await fetch(
      `${baseURL}/get_search_result/${searchResultID}`,
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar o resultado da busca");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar o resultado da pesquisa:", error);
    return null;
  }
};
