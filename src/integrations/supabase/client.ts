import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pwukwiepontjqfvwoswp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dWt3aWVwb250anFmdndvc3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NjI2MDcsImV4cCI6MjA2ODQzODYwN30.v4hNTuHNXko8PNRSFtAkriKvLfy8QI7LN3YOQ5KgrW8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});