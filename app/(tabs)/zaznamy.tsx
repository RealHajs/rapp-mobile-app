import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Použití useRouter pro navigaci
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage pro uložení tokenu

export default function Zaznamy() {
  const router = useRouter();

  // Funkce pro odhlášení
  const handleLogout = async () => {
    try {
      // Odstranění tokenu z AsyncStorage
      await AsyncStorage.removeItem('userToken');
      // Přesměrování na stránku home
      router.replace('../(tabs)/home'); // nebo použij správnou cestu pro home page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zaznamy!</Text>

      {/* Tlačítko pro odhlášení */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF4200',
    padding: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
  },
});