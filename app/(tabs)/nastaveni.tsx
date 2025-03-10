import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import supabase from '../../supabaseClient';
import { User } from '@supabase/supabase-js';

export default function Nastaveni() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        loadUserData(user.id);
      }
    };
    fetchData();
  }, []);

  const loadUserData = async (id: string) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
    if (error || !data) {
      console.log('Chyba:', error);
      Alert.alert('Chyba', 'Nepodařilo se načíst data.');
    } else {
      setEmail(data.email);
      setUsername(data.username || '');
      setPhone(data.phone || '');
      setWeight(data.weight ? data.weight.toString() : '');
      setHeight(data.height ? data.height.toString() : '');
    }
  };

  const handleSave = async () => {
    if (!user) return;
    const { error } = await supabase.from('users').update({
      username,
      phone,
      weight: parseInt(weight, 10),
      height: parseInt(height, 10)
    }).eq('id', user.id);
    if (error) Alert.alert('Chyba', 'Nepodařilo se uložit změny.');
    else Alert.alert('Úspěch', 'Změny byly uloženy.');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('../pages/login');
  };

  // ✅ Když není přihlášený uživatel, zobraz jen tlačítko na login
  if (!user) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('../pages/login')}>
          <Text style={styles.buttonText}>Log-in</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ✅ Když je přihlášený, zobraz nastavení
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Nastavení profilu</Text>

      <TextInput
        style={[styles.input, { backgroundColor: '#ddd' }]}
        value={email}
        editable={false}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Váha (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Výška (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Uložit změny</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    alignSelf: 'center',
  },
  input: {
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
    elevation: 2,
  },
  button: {
    backgroundColor: '#FA4032',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#E53935',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginTop: 15,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});