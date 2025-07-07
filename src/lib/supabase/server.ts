import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createServerSupabaseClient = () => {
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name) {
        return cookies().get(name)?.value;
      },
      set(name, value, options) {
        cookies().set(name, value, options);
      },
      remove(name, options) {
        cookies().set(name, '', { ...options, maxAge: 0 });
      },
    },
  });
};
