import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://visojdvxfbrqbaliayik.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpc29qZHZ4ZmJycWJhbGlheWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NTI0MjYsImV4cCI6MjA1ODMyODQyNn0.m4bFcdwtPmF-1RyvN3h33eh3Y8Oh7y5wOR_Cn62Zhs8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
