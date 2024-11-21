import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ejxocwglydwmaftakzki.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeG9jd2dseWR3bWFmdGFremtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNzM2NDYsImV4cCI6MjA0Njg0OTY0Nn0.yis3ynG7t25XsvmwT2LtzTknjISQVSLked52BeB1QWs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
