import baseURL from "@/utils/config";

// services/draftService.ts
export const fetchDrafts = async () => {
  console.log("Buscando rascunhos...", baseURL);
  try {
    const response = await fetch(`${baseURL}/get_drafts`);
    console.log("Resposta da requisição:", response);
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

export const createDraft = async (draft: {
  image_url: string;
  description: string;
  source: string;
  price: string;
  promotion: boolean;
  link: string;
  search_id: string;
  created_at: string;
  updated_at: string;
}) => {
  try {
    const response = await fetch(`${baseURL}/create_draft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar rascunho");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao criar rascunho:", error);
    return null;
  }
};

export const deleteDraft = async (id: string) => {
  try {
    const response = await fetch(`${baseURL}/delete_draft/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar rascunho");
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar rascunho:", error);
    return false;
  }
};

export const deleteDraftsBySearchID = async (id: string) => {
  try {
    const response = await fetch(
      `${baseURL}/delete_drafts_by_search_id/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Erro ao deletar rascunho por search_id");
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar rascunho por search_id:", error);
    return false;
  }
};

export async function fetchDraft(id: string) {
  console.log("Fetching product with id:", id);
  try {
    const response = await fetch(`${baseURL}/get_draft/${id}`);

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar o rascunho do produto: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Erro ao buscar rascunho do produto no Services:", error);
    return null; // Retornar null em caso de erro
  }
}

export async function fetchDraftsBySearchID(id: string) {
  console.log("Fetching product with id:", id);
  try {
    const response = await fetch(`${baseURL}/get_drafts_by_search_id/${id}`);

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar o rascunho do produto: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Erro ao buscar rascunho do produto no Services:", error);
    return null; // Retornar null em caso de erro
  }
}

export const updateDraft = async (draft: {
  id: string;
  codigo: string;
  image_url: string;
  description: string;
  source: string;
  price: number;
  promotion: boolean;
  link: string;
  search_id: string;
}) => {
  try {
    const searchExists = await fetch(
      `${baseURL}/get_search/${draft.search_id}`,
    );

    if (!searchExists.ok) {
      throw new Error("O search_id fornecido não existe.");
    }
    const response = await fetch(
      `${baseURL}/update_draft?draftID=${draft.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      },
    );

    console.log("Resposta da requisição:", draft);

    if (!response.ok) {
      console.error("Falha na resposta da requisição", await response.text());
      throw new Error("Erro ao atualizar o rascunho do produto");
    }
    console.log("Rascunho atualizado com sucesso"); // Log de sucesso
    return true;
  } catch (error) {
    console.error("Erro ao atualizar o rascunho do produto", error);
    return false;
  }
};
