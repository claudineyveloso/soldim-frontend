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
