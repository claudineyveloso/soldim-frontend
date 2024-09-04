import { parseCookies } from "nookies";

export function getAuthToken(): string | undefined {
  const cookies = parseCookies();
  return cookies["soldim-token"];
}
