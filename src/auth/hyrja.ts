// Ky modul lidh format e aplikacionit me Supabase Auth.
// Kthen rezultate të qarta dhe mesazhe gabimi në shqip.
import type { Session } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';

export type RezultatiHyrjes<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function mesazhAuth(error: { code?: string; message: string }): string {
  const code = error.code?.toLowerCase() ?? '';
  const message = error.message.toLowerCase();

  if (
    code === 'invalid_credentials' ||
    message.includes('invalid login credentials') ||
    message.includes('invalid email or password')
  ) {
    return 'Email-i ose fjalëkalimi është i pasaktë.';
  }
  if (
    code === 'email_exists' ||
    code === 'user_already_exists' ||
    message.includes('already registered') ||
    message.includes('already been registered') ||
    message.includes('already exists')
  ) {
    return 'Ky email është regjistruar tashmë.';
  }
  if (
    code === 'weak_password' ||
    message.includes('password should be at least') ||
    message.includes('weak password')
  ) {
    return 'Fjalëkalimi është shumë i dobët. Zgjidh një fjalëkalim më të fortë.';
  }
  if (/network|fetch|offline|timeout|connection/.test(message)) {
    return 'Nuk ka lidhje me internetin. Kontrollo rrjetin dhe provo përsëri.';
  }

  return 'Veprimi nuk u krye. Provo përsëri.';
}

export async function regjistrohu(
  email: string,
  password: string,
  emriPlote?: string
): Promise<RezultatiHyrjes<Session | null>> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: emriPlote?.trim()
        ? { data: { full_name: emriPlote.trim() } }
        : undefined,
    });

    if (error) return { ok: false, error: mesazhAuth(error) };
    return { ok: true, data: data.session };
  } catch (error) {
    return {
      ok: false,
      error: mesazhAuth({
        message: error instanceof Error ? error.message : 'network error',
      }),
    };
  }
}

export async function kyçu(
  email: string,
  password: string
): Promise<RezultatiHyrjes<Session | null>> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) return { ok: false, error: mesazhAuth(error) };
    if (!data.session) {
      return { ok: false, error: 'Hyrja nuk krijoi një sesion. Provo përsëri.' };
    }
    return { ok: true, data: data.session };
  } catch (error) {
    return {
      ok: false,
      error: mesazhAuth({
        message: error instanceof Error ? error.message : 'network error',
      }),
    };
  }
}

export async function dil(): Promise<RezultatiHyrjes<void>> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { ok: false, error: mesazhAuth(error) };
    return { ok: true, data: undefined };
  } catch (error) {
    return {
      ok: false,
      error: mesazhAuth({
        message: error instanceof Error ? error.message : 'network error',
      }),
    };
  }
}

export async function lexoSesioni(): Promise<RezultatiHyrjes<Session | null>> {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) return { ok: false, error: mesazhAuth(error) };
    return { ok: true, data: data.session };
  } catch (error) {
    return {
      ok: false,
      error: mesazhAuth({
        message: error instanceof Error ? error.message : 'network error',
      }),
    };
  }
}

export function shpjegoGabiminSupabase(message: string): string {
  const normalized = message.toLowerCase();
  if (
    normalized.includes('permission denied') ||
    normalized.includes('row-level security') ||
    normalized.includes('not allowed')
  ) {
    return 'Nuk ke leje për këtë veprim. Kontrollo hyrjen dhe politikat e sigurisë në Supabase.';
  }
  if (/network|fetch|offline|timeout|connection/.test(normalized)) {
    return 'Nuk ka lidhje me internetin. Kontrollo rrjetin dhe provo përsëri.';
  }
  return 'Ndodhi një gabim gjatë komunikimit me Supabase. Provo përsëri.';
}
