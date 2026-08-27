import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://duokqatddkktlknvaiuf.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1b2txYXRkZGtrdGxrbnZhaXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NTY3ODgsImV4cCI6MjEwMzQzMjc4OH0.S2_ieHc0URNC-6toFoIzzlL-By5w-vBwnqLhMEl4ht8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
