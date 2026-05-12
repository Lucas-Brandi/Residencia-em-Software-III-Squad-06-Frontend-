import { UserRole } from '@/types/user';

export function useAuth() {
  // Mocked auth state. In a real app, this comes from an AuthContext or global store (e.g., Zustand, Redux).
  // Change role to 'admin' to test showing the Administration menu.
  return {
    user: {
      role: 'dev' as UserRole,
    },
    isAuthenticated: true,
  };
}
