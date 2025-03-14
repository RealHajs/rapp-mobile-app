//SQL COMMANDS

//SELECT * FROM profiles

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

          <Text style={styles.hlavnitext}>SPRINT<Text style={styles.hlavnitextSecond}>IFY</Text></Text>
          <Text style={styles.hlavnitext2}>Chase your dreams with every step</Text>
    
          {/* <Text style={styles.loginText3}>PROFILE 
            <Text style={styles.loginTextPodButtonem3}> SETTINGS</Text>
          </Text> */}

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
    top: 45,
  },
  label: {
    width: '80%',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    top: 40,
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
    textAlign: "center",
    top: 100,
    width: 275,
  },
  updateText: {
    color: 'white',
    fontSize: 18,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: '#FF4200',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
    top: 100,
    width: 275,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    textAlign: "center",
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

  loginTextPodButtonem3: {
    color: '#FF4200',
    fontWeight: 500,
  },

  hlavnitext: {
    fontSize: 40,
    color: '#FF4200',
    position: 'absolute',
    top: 150,
    left: 40,
    fontWeight: '600',
    fontFamily: 'RubikWetPaint-Regular',
    textAlign: 'left',
  },


  hlavnitextSecond: {
    color: 'black',
  },


  hlavnitext2: {
    fontSize: 15,
    color: 'black',
    position: 'absolute',
    top: 200,
    left: 40,
    fontWeight: '400',
    fontFamily: 'RubikWetPaint-Regular',
    textAlign: 'left',
  },

  loginText3: {
    color: 'black',
    fontSize: 30,
    // left: -45,
    alignSelf: "center",
    top: 50,
  },


});