import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import supabase from '../../supabaseClient';

export default function Registrace() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert('Chyba', error.message);
      return;
    }

    if (!data.user) {
      Alert.alert('Chyba', 'User data is missing after registration.');
      return;
    }

    // Zapsání do vlastní users tabulky
    const { error: insertError } = await supabase.from('users').insert({
      id: data.user.id, // MUSÍ BÝT ID z auth
      email,
      username
    });

    if (insertError) {
      Alert.alert('Chyba', 'Nepodařilo se uložit uživatele do databáze.');
      console.log(insertError);
      return;
    }

    Alert.alert('Úspěch', 'Registrace proběhla úspěšně!');
    router.push('../pages/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registration</Text>

      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput placeholder="Repeat Password" style={styles.input} secureTextEntry value={repeatPassword} onChangeText={setRepeatPassword} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account?</Text>
        <Link href="../pages/login">
          <Text style={styles.linkHighlight}>Login</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#F9F9F9' },
  header: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 30, alignSelf: 'center' },
  input: { height: 55, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 20, fontSize: 16, marginBottom: 15, elevation: 2 },
  button: { backgroundColor: '#FA4032', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 3, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '500' },
  linkContainer: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
  linkText: { color: '#888', fontSize: 14 },
  linkHighlight: { color: '#FA4032', marginLeft: 5, fontWeight: 'bold' },
});