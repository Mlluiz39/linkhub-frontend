import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://SEU-PROJETO.supabase.co'
const supabaseAnonKey = 'SUA-ANON-KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
