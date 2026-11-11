// Ky modul është zëvendësues provizor për prova zhvillimi pa Supabase.
// Nuk përdoret nga aplikacioni; nuk krijon sesion real ose hyrje të vërtetë.
import type { Session } from '@supabase/supabase-js';

import type { RezultatiHyrjes } from './hyrja';

const gabimOffline = 'Modaliteti offline nuk krijon sesion real.';

export async function regjistrohu(
  _email: string,
  _password: string,
  _emriPlote?: string
): Promise<RezultatiHyrjes<Session | null>> {
  return { ok: false, error: gabimOffline };
}

export async function kyçu(
  _email: string,
  _password: string
): Promise<RezultatiHyrjes<Session | null>> {
  return { ok: false, error: gabimOffline };
}

export async function dil(): Promise<RezultatiHyrjes<void>> {
  return { ok: false, error: gabimOffline };
}

export async function lexoSesioni(): Promise<RezultatiHyrjes<Session | null>> {
  return { ok: false, error: gabimOffline };
}
