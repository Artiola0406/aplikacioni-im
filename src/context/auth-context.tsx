import { dil } from '@/auth/hyrja';
import { useSesioni } from '@/auth/sesioni';

export function useAuth() {
  const { session, user, loading } = useSesioni();
  return {
    isAuthenticated: session !== null,
    isGuest: false,
    user,
    userEmail: user?.email ?? null,
    signOut: dil,
    loading,
  };
}
