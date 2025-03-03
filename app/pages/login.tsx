import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import supabase from '../../supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Store user session or token
      await AsyncStorage.setItem('userToken', data.session.access_token);

      // Navigate to the home page after successful login
      // router.push('/home');

      // <Link href="/home">
      //   <ThemedText style={styles.buttonBackText} type="link">v</ThemedText>
      // </Link>

      alert('Successfully logged in!');
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error(error);
      setError('There was an issue with your login');
    }
  };

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.container}>

        <TouchableOpacity style={styles.buttonBackText}>
          <Link href="/">
            <ThemedText style={styles.buttonBackText} type="link">Back</ThemedText>
          </Link>
        </TouchableOpacity>

        <View>
          <Image source={require('../../assets/images/bezci.png')} style={styles.obrazekRegistrace} />
        </View>

        <ThemedText style={styles.buttonTextRegistrace}>Log In</ThemedText>

        <TextInput
          style={styles.inputMain}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your e-mail"
          placeholderTextColor="white"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.inputSecond}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="white"
          secureTextEntry={true}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.buttonUprava} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

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
  obrazekRegistrace: {
    padding: 10,
    borderRadius: 20,
    width: 200,
    height: 200,
    alignSelf: 'center',
    position: "absolute",
    top: -150,
    justifyContent: 'center',
    zIndex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: "whitesmoke",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  inputMain: {
    width: 345,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#cc0000",
    top: 100,
    color: "white",
  },
  inputSecond: {
    width: 345,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#cc0000",
    top: 115,
    color: "white",
  },
  error: {
    color: "white",
    top: 80,
    fontSize: 30,
  },
  buttonUprava: {
    width: 345,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#FA4032",
    justifyContent: 'center',
    alignItems: 'center',
    top: 210,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  buttonBackText: {
    fontSize: 25,
    fontWeight: 'normal',
    color: "black",
    top: 70,
    position: "absolute",
    transform: [{ rotate: '90deg' }],
    left: 37,
  },
  buttonTextRegistrace: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'normal',
    textAlign: 'center',
    top: 80,
    zIndex: 2,
    height: 100,
    paddingTop: 20,
  },
});