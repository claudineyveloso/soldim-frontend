// services/draftService.ts
export const fetchDrafts = async () => {
  try {
    const response = await fetch("http://localhost:8080/get_drafts");
    if (!response.ok) {
      throw new Error("Erro ao buscar rascunhos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar rascunhos:", error);
    return [];
  }
};
