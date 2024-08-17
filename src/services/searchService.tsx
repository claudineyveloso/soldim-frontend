// services/searchService.ts
export const fetchSearches = async () => {
  try {
    const response = await fetch("http://localhost:8080/get_searches");
    if (!response.ok) {
      throw new Error("Erro ao buscar as pequisas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar pesquisas:", error);
    return [];
  }
};

export const fetchLastSearch = async () => {
  try {
    const response = await fetch("http://localhost:8080/get_last_search");
    if (!response.ok) {
      throw new Error("Erro ao buscar a última pequisas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar a última pesquisas:", error);
    return [];
  }
};

export async function fetchSearch(id: string) {
  console.log("Fetching search with id:", id);
  try {
    const response = await fetch(`http://localhost:8080/get_search/${id}`);

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar a procura na web: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Erro ao buscar produto no Services:", error);
    return null; // Retornar null em caso de erro
  }
}

export const deleteSearch = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8080/delete_search/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao deletar a busca da web: ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar a busca da web:", error);
    return false;
  }
};
