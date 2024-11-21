import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, Button, StyleSheet, TouchableOpacity, } from 'react-native';
import supabase from '../../supabaseClient';

import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function Registrace() {
  const [error, setError] = useState('');

  const [nickname, setNickname] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');


  const handleSubmit = async () => { //start hned po odeslani
    if (!nickname || !email || !password) { //! dela "je hodnota NULL ?"
      setError('Please fill in all fields');
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('registraceUzivatelu')
        .insert([
          {
            created_at: new Date(),
            nickname: nickname,
            email: email,
            password: password,
          },
        ]);
  
      if (error) {
        throw error;
      }
  
      alert('Your account has been successfully created !');
      setNickname('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error(error);
      setError('There was a problem with saving your datas.');
    }
  };

  return (
    <ImageBackground style={styles.background}>
    <View style={styles.container}>

      <TouchableOpacity style={styles.buttonBackText}>
        <Link href="../(tabs)/aktivity">
          <ThemedText style={styles.buttonBackText} type="link">v</ThemedText>
        </Link>
      </TouchableOpacity>

      
      <Text style={styles.nazevStranky}>Create an account</Text>

      <Text style={styles.nazevStranky2}>By proceeding, you acknowledge and consent to the processing our
        <Text style={styles.cervenabarva}> Privacy Policy.</Text>
      </Text>


      <TextInput
        style={styles.inputMain}
        value={nickname}
        onChangeText={setNickname}
        placeholder="Enter your nickname"
        placeholderTextColor="white"
        keyboardType="email-address"
      />


      <TextInput
        style={styles.inputSecond}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your e-mail"
        placeholderTextColor="white"
        keyboardType="email-address"
      />


      <TextInput
        style={styles.inputThird}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="white"
        keyboardType="email-address"
        secureTextEntry={true} // [type="password"]
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.buttonUprava} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create an account</Text>
      </TouchableOpacity>

      {/* <Button title="Odeslat" onPress={handleSubmit} /> */}


      <Text style={styles.textPrivacyPolicy}>By proceeding, you acknowledge and consent to the collection, processing, and usage of your personal data as outlined in our</Text>
      <Text style={styles.textPrivacyPolicy2}> Privacy Policy.</Text>



      


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

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: "#0B0B0B",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },

  nazevStranky: {
    fontSize: 35,
    fontWeight: 'bold',
    color: "white",
    top: -120,
    left: -15,
  },

  nazevStranky2: {
    fontSize: 12,
    fontWeight: 'normal',
    color: "white",
    top: -113,
    left: 15,
    marginRight: 100,
  },

  cervenabarva:{
    color: "#FA4032",
  },
  

  inputMain: {
    width: 345,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#B63F36",
    top: -60,
  },

 


  inputSecond: {
    width: 345,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#B63F36",
    top: -20,
  },


  inputThird: {
    width: 345,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#B63F36",
    top: 20,
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
    top: 160,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },


  textPrivacyPolicy: {
    fontSize: 10,
    fontWeight: 'normal',
    color: "white",
    top: 202,
    textAlign: "center",
  },

  textPrivacyPolicy2: {
    fontSize: 10,
    fontWeight: 'normal',
    color: "#FA4032",
    top: 203,
    textAlign: "center",
  },

  buttonBackText: {
    fontSize: 40,
    fontWeight: 'normal',
    color: "white",
    top: 70,
    position: "absolute",
    transform: [{ rotate: '90deg' }],
    left: 37,
  },



});
