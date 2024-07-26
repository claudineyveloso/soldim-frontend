// services/searchService.ts

import axios from "axios";

interface FetchSearchesResultResponse {
  searchesResult: any[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export async function fetchSearchesResult(
  limit: number = 10,
  offset: number = 0,
): Promise<FetchSearchesResultResponse> {
  try {
    const response = await axios.get(
      "http://localhost:8080/get_searches_result",
      {
        params: {
          limit: limit,
          offset: offset,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

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
      totalCount: data.total_count,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
    };
  } catch (error) {
    console.error("Erro ao buscar o resultado da busca:", error);
    return {
      searchesResult: [],
      totalCount: 0,
      page: 1,
      pageSize: limit,
    };
  }
}

export const deleteSearchResult = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/delete_search_result/${id}`,
      {
        method: "DELETE",
      },
    );

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
      `http://localhost:8080/get_search_result/${searchResultID}`,
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
