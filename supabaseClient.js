import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xsbrkgquynjufrxqbixn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzYnJrZ3F1eW5qdWZyeHFiaXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDQzMTUsImV4cCI6MjA1NzE4MDMxNX0.cLp0RpBelT2bPTrjNILbQj_huW1VbbelX6H9Mnl75j4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});