import { createContext, useContext, useMemo, useState } from 'react';

type AuthContextValue = {
  isAuthenticated: boolean;
  isGuest: boolean;
  userEmail: string | null;
  signIn: (email: string, password: string) => boolean;
  signUp: (email: string, password: string) => boolean;
  signOut: () => void;
  continueAsGuest: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const signIn = (email: string, password: string) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || password.length < 6) {
      return false;
    }
    setUserEmail(trimmedEmail);
    setIsAuthenticated(true);
    setIsGuest(false);
    return true;
  };

  const signUp = (email: string, password: string) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || password.length < 6) {
      return false;
    }
    setUserEmail(trimmedEmail);
    setIsAuthenticated(true);
    setIsGuest(false);
    return true;
  };

  const continueAsGuest = () => {
    setUserEmail(null);
    setIsGuest(true);
    setIsAuthenticated(false);
  };

  const signOut = () => {
    setUserEmail(null);
    setIsGuest(false);
    setIsAuthenticated(false);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isGuest,
      userEmail,
      signIn,
      signUp,
      signOut,
      continueAsGuest,
    }),
    [isAuthenticated, isGuest, userEmail]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
