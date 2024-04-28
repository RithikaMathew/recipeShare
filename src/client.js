import { createClient } from '@supabase/supabase-js'

const URL = 'https://zgcdiaajipksqevrpfaj.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnY2RpYWFqaXBrc3FldnJwZmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4OTA4MjAsImV4cCI6MjAyOTQ2NjgyMH0.gKTxrkKZGslXJGJDTe2090faZ-m64Hk1xULza4qTbdw';

export const supabase = createClient(URL, API_KEY);