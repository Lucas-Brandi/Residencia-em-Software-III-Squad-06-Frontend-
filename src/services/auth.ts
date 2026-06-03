export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  email?: string;
  githubUsername?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

async function parseResponseError(res: Response) {
  const contentType = res.headers.get('content-type') ?? '';
  let message = res.statusText;

  if (contentType.includes('application/json')) {
    try {
      const body = await res.json();
      if (body?.message) {
        if (Array.isArray(body.message)) {
          message = body.message.join(', ');
        } else {
          message = body.message;
        }
      } else if (body?.error) {
        message = body.error;
      } else {
        message = JSON.stringify(body);
      }
    } catch {
      message = res.statusText;
    }
  } else {
    const text = await res.text();
    if (text) message = text;
  }

  throw new Error(`Erro ${res.status}: ${message}`);
}

export const authService = {
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) await parseResponseError(res);
    return res.json();
  },

  register: async (dto: RegisterDto) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) await parseResponseError(res);
    return res.json();
  },
};
