import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '../supabaseClient';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // ✅ Přihlášený uživatel → přesměrování na HomeScreen
        router.replace('/HomeScreen');
      } else {
        // ❌ Nepřihlášený uživatel → přesměrování na WelcomePage
        router.replace('/pages/unLogin/welcomePage');
      }
    };

    checkAuth();
  }, []);

  return null; // nic neukazuje, jen přesměrovává
}