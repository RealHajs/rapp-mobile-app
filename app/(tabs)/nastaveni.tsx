import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabaseClient';

export default function Nastaveni() {
  const router = useRouter();

  // Funkce pro odhlášení
  const handleLogout = async () => {
    try {
      // Odhlášení přes Supabase
      await supabase.auth.signOut();
      // Přesměrování na IndexPage (který ověří přihlášení)
      router.replace('../index');
    } catch (error) {
      console.error('Chyba při odhlášení:', error);
    }
  };

  // Funkce pro login (pouze přesměrování na IndexPage, kde se ověří login stav)
  const handleLogin = () => {
    router.replace('../index'); // IndexPage zjistí, zda je login, a přesměruje dál
  };

  return (
    <View style={styles.container}>

      {/* Tlačítko pro odhlášení */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Tlačítko pro login */}
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF4200',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
});