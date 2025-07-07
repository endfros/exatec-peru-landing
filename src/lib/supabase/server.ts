import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createServerSupabaseClient = () => {
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      async get(name) {
        const cookieStore = await cookies();
        return cookieStore.get(name)?.value;
      },
      async set(name, value, options) {
        const cookieStore = await cookies();
        cookieStore.set(name, value, options);
      },
      async remove(name, options) {
        const cookieStore = await cookies();
        cookieStore.set(name, '', { ...options, maxAge: 0 });
      },
    },
  });
};
