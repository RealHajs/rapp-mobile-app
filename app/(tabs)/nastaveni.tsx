import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../supabaseClient';

export default function Nastaveni() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadUserData();
    loadDarkMode();
  }, []);

  // Načtení uživatelských dat z Supabase
  const loadUserData = async () => {
    const { data, error } = await supabase
      .from('registraceUzivatelu')
      .select('*')
      .eq('email', 'uzivatel@email.com') // Dynamicky nahraď
      .single();

    if (error) {
      console.error('Error loading user data:', error);
    } else {
      setNickname(data.nickname);
      setEmail(data.email);
      setPhone(data.phone || '');
      setHeight(data.height || '');
      setWeight(data.weight || '');
    }
  };

  // Povolení GPS
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Chyba', 'GPS není povoleno.');
    } else {
      Alert.alert('Úspěch', 'GPS bylo povoleno.');
    }
  };

  // Povolení Notifikací
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Chyba', 'Notifikace nejsou povoleny.');
    } else {
      Alert.alert('Úspěch', 'Notifikace byly povoleny.');
    }
  };

  // Povolení Fotoaparátu
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Chyba', 'Fotoaparát není povolen.');
    } else {
      Alert.alert('Úspěch', 'Fotoaparát byl povolen.');
    }
  };

  // Přepnutí Dark Mode
  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Načtení Dark Mode z AsyncStorage
  const loadDarkMode = async () => {
    const storedMode = await AsyncStorage.getItem('darkMode');
    if (storedMode !== null) {
      setDarkMode(JSON.parse(storedMode));
    }
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('registraceUzivatelu')
      .update({ nickname, email, phone, height, weight })
      .eq('email', 'uzivatel@email.com');

    if (error) {
      Alert.alert('Chyba', 'Nepodařilo se uložit změny.');
      console.error(error);
    } else {
      Alert.alert('Úspěch', 'Nastavení bylo uloženo.');
    }
  };

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : {}]}>
      <Text style={[styles.heading, darkMode ? styles.darkText : {}]}>Nastavení</Text>

      <TextInput style={styles.input} value={nickname} onChangeText={setNickname} placeholder="Přezdívka" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Telefon" keyboardType="phone-pad" />
      <TextInput style={styles.input} value={height} onChangeText={setHeight} placeholder="Výška (cm)" keyboardType="numeric" />
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} placeholder="Váha (kg)" keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Uložit změny</Text>
      </TouchableOpacity>

      {/* Povolení GPS, Notifikací, Fotoaparátu */}
      <TouchableOpacity style={styles.permissionButton} onPress={requestLocationPermission}>
        <Text style={styles.buttonText}>Povolit GPS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.permissionButton} onPress={requestNotificationPermission}>
        <Text style={styles.buttonText}>Povolit Notifikace</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.permissionButton} onPress={requestCameraPermission}>
        <Text style={styles.buttonText}>Povolit Fotoaparát</Text>
      </TouchableOpacity>

      {/* Přepínač Dark Mode */}
      <View style={styles.darkModeContainer}>
        <Text style={[styles.darkModeText, darkMode ? styles.darkText : {}]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  darkContainer: { backgroundColor: '#121212' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  darkText: { color: 'white' },
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 10, backgroundColor: 'white' },
  button: { backgroundColor: '#FA4032', padding: 15, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  permissionButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 5, marginTop: 10 },
  darkModeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  darkModeText: { fontSize: 18, marginRight: 10 },
});