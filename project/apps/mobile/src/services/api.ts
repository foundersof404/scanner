const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

async function request(path: string, options: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = (data && data.message) || 'Request failed';
    throw new Error(message);
  }

  return data;
}

export function signup(payload: { name: string; email: string; password: string }) {
  return request('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function login(payload: { email: string; password: string }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function deleteAccount(token: string) {
  return request('/api/auth/account', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function setApiBase(url: string) {
  // Helper to change base at runtime if needed
  (global as any).__API_BASE__ = url;
}

