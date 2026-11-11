// Ky kontekst lexon sesionin Supabase dhe dëgjon ndryshimet e hyrjes.
// Ofron sesionin, përdoruesin dhe gjendjen e ngarkimit për aplikacionin.
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';

import { lexoSesioni } from './hyrja';
import { supabase } from '@/lib/supabase';

type SesioniState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  riprovo: () => void;
};

const SesioniContext = createContext<SesioniState | null>(null);

export function SesioniProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    let authEventReceived = false;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      authEventReceived = true;
      if (!active) return;
      setSession(nextSession);
      setError(null);
    });

    async function ngarkoSesioni() {
      setLoading(true);
      setError(null);
      const result = await lexoSesioni();
      if (!active) return;

      if (!authEventReceived) {
        if (!result.ok) {
          setError(result.error);
        } else {
          setSession(result.data);
        }
      }
      setLoading(false);
    }

    void ngarkoSesioni();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [attempt]);

  const value: SesioniState = {
    session,
    user: session?.user ?? null,
    loading,
    error,
    riprovo: () => setAttempt(current => current + 1),
  };

  return <SesioniContext.Provider value={value}>{children}</SesioniContext.Provider>;
}

export function useSesioni(): SesioniState {
  const context = useContext(SesioniContext);
  if (!context) {
    throw new Error('useSesioni duhet të përdoret brenda SesioniProvider.');
  }
  return context;
}
