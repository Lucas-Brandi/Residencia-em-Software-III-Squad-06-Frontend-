export const authService = {
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
  },
};
