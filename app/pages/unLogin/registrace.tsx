import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { supabase } from '../../../supabaseClient'; // Správná cesta z /pages

export default function Registrace() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Chyba', 'Hesla se neshodují.');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert('Chyba při registraci', error.message);
    } else {
      Alert.alert('Registrace úspěšná', 'Nyní se můžete přihlásit.');
      router.push('/pages/login'); // správná cesta
    }
  };

  return (
    <View style={styles.container}>
      
       <Text style={styles.hlavnitext}>SPRINT<Text style={styles.hlavnitextSecond}>IFY</Text></Text>
            <Text style={styles.hlavnitext2}>Chase your dreams with every step</Text>
      
            <Text style={styles.loginText}>REGISTRATION</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Heslo" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Potvrdit heslo" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrovat se</Text>
      </TouchableOpacity>

      <Text style={styles.loginTextPodButtonem}>
            Do you have an account yet? |
        <Link href="./login">
          <Text style={styles.loginTextPodButtonem2}>Log-in</Text>
        </Link>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, top: 40, width: 320, height: 50, justifyContent: "center", textAlign: "center", alignSelf: "center", borderColor: 'darkgray', padding: 10, marginBottom: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16 },

  button: {
    backgroundColor: '#ff4200',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: 240,
    height: 60,
    alignSelf: 'center',
    position: 'absolute',
    top: 620,
    justifyContent: 'center',
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


  loginText: {
    fontSize: 35,
    color: 'black',
    position: 'absolute',
    top: 300,
    fontWeight: '400',
    fontFamily: 'RubikWetPaint-Regular',
    textAlign: 'center',
    alignSelf: 'center',
  },

  loginTextPodButtonem3: {
    color: '#FF4200',
    fontWeight: 500,
  },


   loginTextPodButtonem: {
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    top: 700,
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