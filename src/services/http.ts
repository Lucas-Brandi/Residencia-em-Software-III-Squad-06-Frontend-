const BASE = import.meta.env.VITE_API_URL;

export async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!res.ok) throw new Error(`${res.status}`);
  const json = await res.json();
  return json.data;
}
