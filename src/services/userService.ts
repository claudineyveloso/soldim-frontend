import axios from "axios";
import baseURL from "../utils/config";
import { getAuthToken } from "../utils/auth";

interface FetchUsersResponse {
  users: any[];
}

// services/userService.ts
export async function fetchUsers(): Promise<FetchUsersResponse> {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/get_users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Erro ao buscar usuários no Service: ${response.statusText}`,
      );
    }

    return {
      users: response.data,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos no Services:", error);
    return {
      users: [],
    };
  }
}

export async function fetchUser(id: string) {
  try {
    const token = getAuthToken();

    const response = await fetch(`${baseURL}/get_user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar o usuário: ${response.statusText}`);
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Erro ao buscar produto no Services:", error);
    return null; // Retornar null em caso de erro
  }
}

export async function createUser(user: {
  email: string;
  password: string;
  is_active: boolean;
  user_type: "S" | "A" | "C";
}) {
  console.log("Creating user:", user);
  try {
    const response = await fetch(`${baseURL}/create_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao criar o usuário: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erro ao criar usuário no Services:",
      (error as Error).message,
    );
    return null; // Retornar null em caso de erro
  }
}

export async function DisableUser(): Promise<FetchUsersResponse> {
  try {
    const response = await axios.get(`${baseURL}/disabled_user`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Erro ao buscar usuários no Service: ${response.statusText}`,
      );
    }

    return {
      users: response.data.users,
    };
  } catch (error) {
    console.error("Erro ao desabilitar o usuário no Services:", error);
    return {
      users: [],
    };
  }
}
