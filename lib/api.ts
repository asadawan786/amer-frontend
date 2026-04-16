const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://amer-backend.vercel.app";

export async function apiRequest(
  method: string,
  path: string,
  body?: unknown
): Promise<Response> {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res;
}
