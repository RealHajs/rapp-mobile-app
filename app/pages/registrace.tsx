import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router'; 
import supabase from '../../supabaseClient';

export default function Registrace() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password || !repeatPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      // Registrace uživatele pomocí Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Uložení uživatele do tabulky `users`
      await supabase.from('users').insert([
        {
          email: email,
          password: password,
        },
      ]);

      alert('Account created successfully!');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
      setError('');

      router.push('../pages/login');
    } catch (error) {
      console.error(error);
      setError('There was a problem with saving your data.');
    }
  };

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.hlavnitext}>SPRINT<Text style={styles.hlavnitextSecond}>IFY</Text></Text>
        <Text style={styles.hlavnitext2}>Chase your dreams with every step</Text>

        <TextInput
          style={styles.inputMain}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <TextInput
          style={styles.inputSecond}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          style={styles.inputThird}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          placeholder="Repeat Password"
          secureTextEntry
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.loginTextPodButtonem}>
          Do you have an account yet? |
          <Link href="../pages/login">
            <Text style={styles.loginTextPodButtonem2}>log-in</Text>
          </Link>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hlavnitext: {
    fontSize: 40,
    color: '#FF4200',
    position: 'absolute',
    top: 135,
    left: 20,
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
    top: 185,
    left: 20,
    fontWeight: '400',
    fontFamily: 'RubikWetPaint-Regular',
    textAlign: 'left',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: 'whitesmoke',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  inputMain: {
    width: 300,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#E9E9E9',
    top: 50,
    textAlign: 'center',
  },
  inputSecond: {
    width: 300,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#E9E9E9',
    top: 70,
    textAlign: 'center',
  },
  inputThird: {
    width: 300,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#E9E9E9',
    top: 90,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    top: 120,
    fontSize: 15,
  },
  button: {
    width: 300,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#FA4032',
    justifyContent: 'center',
    alignItems: 'center',
    top: 160,
  },
  loginTextPodButtonem: {
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    top: 770,
    fontWeight: '300',
    fontFamily: 'RubikWetPaint-Regular',
    alignSelf: 'center',
  },
  loginTextPodButtonem2: {
    color: '#FF4200',
    textDecorationLine: 'underline',
    textDecorationColor: '#FF4200',
  },
});