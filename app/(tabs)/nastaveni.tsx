import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Použití useRouter pro navigaci
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage pro uložení tokenu

export default function Nastaveni() {
  const router = useRouter();

  // Funkce pro odhlášení
  const handleLogout = async () => {
    try {
      // Odstranění tokenu z AsyncStorage
      await AsyncStorage.removeItem('userToken');
      // Přesměrování na stránku home
      router.replace('../pages/welcomePage'); // nebo použij správnou cestu pro home page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>

      {/* Tlačítko pro odhlášení */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log In</Text>
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
});