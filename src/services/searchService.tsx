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
