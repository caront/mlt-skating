import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js@2";

let client: SupabaseClient | null = null;
export const setSupabaseClient = (newClient: SupabaseClient) => {
  client = newClient;
};

const getSupabaseClient = (): SupabaseClient => {
  if (!client) {
    // Supabase configuration
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error("Missing Supabase URL or Key");
    }
    client = createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return client;
};

export default getSupabaseClient();
