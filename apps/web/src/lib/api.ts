/**
 * API client for NestJS backend.
 * Base URL from VITE_API_URL (default: http://localhost:3000)
 */

const getBaseUrl = () =>
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:3000";

const TOKEN_KEY = "auth_token";

/** Read token from cookie (set by server on login). Works in browser only. */
export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + TOKEN_KEY + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/** For server-side: set token in cookie. Client uses cookie automatically. */
export function setToken(_token: string): void {
  // No-op: server sets cookie via cookie.set() in routeAction$
  if (typeof document === "undefined") return;
  // Fallback: set cookie on client if we got token from somewhere
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(_token)}; path=/; max-age=86400; samesite=strict`;
}

export function clearToken(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

async function request<T>(
  path: string,
  options: RequestInit & { skipAuthRedirect?: boolean } = {},
): Promise<T> {
  const { skipAuthRedirect, ...init } = options;
  const url = `${getBaseUrl()}${path}`;
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...init, headers });

  if (res.status === 401 && !skipAuthRedirect && typeof window !== "undefined") {
    clearToken();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>(path, { ...options, method: "POST", body: JSON.stringify(body) }),

  put: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>(path, { ...options, method: "PUT", body: JSON.stringify(body) }),

  delete: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
