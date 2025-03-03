import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router'; 
import supabase from '../../supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await AsyncStorage.getItem('userToken');
      if (session) {
        router.push('../pages/home'); 
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async () => {
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
        setError('Invalid email or password');
        return;
      }

      await AsyncStorage.setItem('userToken', data.session.access_token);
      router.push('../pages/home');
      
      alert('Successfully logged in!');
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError('An error occurred during login');
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
          placeholder="email@example.com"
          placeholderTextColor="#646464"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.inputSecond}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          placeholderTextColor="#646464"
          secureTextEntry={true}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>LOG-IN</Text>
        </TouchableOpacity>

        <Text style={styles.loginTextPodButtonem}>
          Don't you have an account yet? |
          <Link href="../pages/registrace">
            <Text style={styles.loginTextPodButtonem2}>Registration</Text>
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  loginTextPodButtonem: {
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    top: 740,
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