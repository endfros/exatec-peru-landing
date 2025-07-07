'use client';

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Creamos un singleton para asegurarnos de usar la misma instancia
let supabaseInstance: ReturnType<typeof createBrowserClient> | undefined;

export const createBrowserSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(supabaseUrl, supabaseKey);
  }
  return supabaseInstance;
};
