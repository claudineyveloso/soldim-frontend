import { parseCookies } from "nookies";

export function getAuthToken(): string | undefined {
  const cookies = parseCookies();
  console.log("Cookies:", cookies);
  return cookies["soldim-token"];
}
