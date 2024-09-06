import baseURL from "@/utils/config";

// services/depositService.ts
//

export const fetchDeposits = async () => {
  try {
    const response = await fetch(`${baseURL}/get_deposits`);
    if (!response.ok) {
      throw new Error("Erro ao buscar depósitos");
    }
    const data = await response.json();
    return data; // Retorna o array diretamente
  } catch (error) {
    console.error("Erro ao buscar depósitos:", error);
    return [];
  }
};
