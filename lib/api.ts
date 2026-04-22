const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://amer-backend.vercel.app";

function getPortalToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("portal-token");
}

export async function apiRequest(
  method: string,
  path: string,
  body?: unknown
): Promise<Response> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = getPortalToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res;
}
