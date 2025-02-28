import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
        <Link href="/">
          <ThemedText style={styles.buttonBackText} type="link">v</ThemedText>
        </Link>
      </TouchableOpacity>


      <View>
        <Image source={require('../../assets/images/bezci.png')} style={styles.obrazekRegistrace} />
      </View>

      
      <ThemedText style={styles.buttonTextRegistrace}>Create An Account</ThemedText>



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
        <Text style={styles.buttonText}>Sign Up Free</Text>
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


  obrazekRegistrace:{
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

  nazevStranky: {
    fontSize: 35,
    fontWeight: 'bold',
    color: "white",
    top: -120,
    left: -15,
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


  inputThird: {
    width: 345,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#cc0000",
    top: 130,
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
