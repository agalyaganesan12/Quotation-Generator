/**
 * Authentication service with demo credentials
 */

import type { User, LoginCredentials } from '../types/auth.types';

// Demo users for authentication
const DEMO_USERS: { username: string; password: string; user: User }[] = [
  {
    username: 'admin',
    password: 'admin123',
    user: {
      id: '1',
      username: 'admin',
      name: 'Administrator',
      role: 'admin',
    },
  },
];

/**
 * Validates login credentials against demo users
 * @param credentials - The login credentials to validate
 * @returns The user object if valid, null otherwise
 */
export function validateCredentials(credentials: LoginCredentials): User | null {
  const match = DEMO_USERS.find(
    (u) => u.username === credentials.username && u.password === credentials.password
  );
  return match ? match.user : null;
}

/**
 * Auth storage keys
 */
export const AUTH_STORAGE_KEY = 'invoice_auth_user';

/**
 * Get stored auth user from localStorage
 */
export function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Store auth user in localStorage
 */
export function storeUser(user: User): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

/**
 * Clear stored auth user
 */
export function clearStoredUser(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
