// services/searchService.ts
export const fetchSearchesResult = async () => {
  try {
    const response = await fetch("http://localhost:8080/get_searches_result");
    if (!response.ok) {
      throw new Error("Erro ao buscar o resultado das pequisas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar o resultado das pesquisas:", error);
    return [];
  }
};

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
