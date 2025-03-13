import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabaseClient';

export default function Nastaveni() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  // Načtení profilu
  const loadProfile = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      console.log('Uživatel není přihlášený nebo chyba:', error);
      setIsLoggedIn(false);
      return;
    }

    // Pokud je přihlášený:
    setIsLoggedIn(true);
    setEmail(user.email || '');

    // Načti profil
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('username, website')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      Alert.alert('Chyba při načítání profilu', profileError.message);
      return;
    }

    if (data) {
      setUsername(data.username || '');
      setWebsite(data.website || '');
    } else {
      console.log('Profil nebyl nalezen, ale uživatel existuje.');
    }
  };

  // Uložit profil
  const updateProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert('Chyba', 'Nejsi přihlášený.');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, username, website, updated_at: new Date() });

    if (error) {
      Alert.alert('Chyba při ukládání', error.message);
    } else {
      Alert.alert('Úspěch', 'Profil aktualizován!');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.replace('../index');
  };

  const handleLogin = () => {
    router.replace('../index');
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text style={styles.label}>Username:</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} />

          <Text style={styles.label}>Website:</Text>
          <TextInput style={styles.input} value={website} onChangeText={setWebsite} />

          <Text style={styles.label}>Email:</Text>
          <TextInput style={[styles.input, { color: 'gray' }]} value={email} editable={false} />

          <TouchableOpacity onPress={updateProfile} style={styles.updateButton}>
            <Text style={styles.updateText}>Update Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Nejsi přihlášený.</Text>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    width: '80%',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 5,
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  updateText: {
    color: 'white',
    fontSize: 18,
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