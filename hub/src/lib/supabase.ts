import { createClient } from '@supabase/supabase-js';

// Fallback seguro: Se as variáveis .env não existirem (ex: rodando localmente pela primeira vez),
// usamos strings mockadas apenas para o React não crashar a tela preta com "URL is required".
// Com isso, as requests falham silenciosamente e ativam o nosso Mock State de Design.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://brisa-laser-mock.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
