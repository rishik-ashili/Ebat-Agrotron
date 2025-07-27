import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://noxleufkyqefncghqbyo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5veGxldWZreXFlZm5jZ2hxYnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NDAwODgsImV4cCI6MjA2OTIxNjA4OH0.HTJwbmmXJgd3mWmQYiJWyTNFm3sqvuBk083BxB7mSNs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
