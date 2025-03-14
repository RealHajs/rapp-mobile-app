import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Link, useRouter } from 'expo-router';
import { Linking, Alert } from 'react-native';

// icons
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function HomeScreen() {
  

  const callEmergency = async () => {
    const url = 'tel:721020161';
  
    const supported = await Linking.canOpenURL(url);
    
  
    if (supported) {
      await Linking.openURL(url); // Zavolá číslo
    } else {
      Alert.alert('Chyba', 'Toto zařízení nepodporuje volání');
    }
  };


  return (
    <View>
      
      <TouchableOpacity onPress={callEmergency}>
        <MaterialCommunityIcons name="car-emergency" style={styles.homepageIconTopSettings} />
      </TouchableOpacity>

      <Text style={styles.homepageMainText}>Become Healty & Stay Resilient.</Text>

      <Text style={styles.homepageSecondText}>Today, 14th March 2025</Text>

      <MapView style={styles.map}></MapView>

      <Text style={styles.homepageTextPodMapou}>Running Tips <AntDesign name="arrowright" size={18} /> </Text>


      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >

      <View style={styles.box}><Text style={styles.boxText2}>Stretching</Text></View>
      <View style={styles.box}><Text style={styles.boxText}>Hydration</Text></View>
      <View style={styles.box}><Text style={styles.boxText2}>Pace Control</Text></View>
      <View style={styles.box}><Text style={styles.boxText}>Breathing</Text></View>
      <View style={styles.box}><Text style={styles.boxText2}>Warm-Up</Text></View>
      <View style={styles.box}><Text style={styles.boxText}>Rest Days</Text></View>
        
      </ScrollView>









    </View>
  );
}




const styles = StyleSheet.create({


  homepageIconTopSettings: {
    fontSize: 30,
    top: 75,
    color: "red",
    left: 40,
  },

  homepageMainText:{
    fontSize: 40,
    top: 120,
    textAlign: "left",
    alignSelf: "center",
    fontFamily: 'RubikWetPaint-Regular',
    color: "black",
    fontWeight: 300,
    left: 10,
    marginRight: 20,
  },


  homepageSecondText: {
    fontSize: 17,
    top: 130,
    textAlign: "left",
    alignSelf: "center",
    fontFamily: 'RubikWetPaint-Regular',
    color: "gray",
    fontWeight: 300,
    left: -57,
  },


  map: { width: '90%', height: '40%', top: 170, borderRadius: 40, overflow: 'hidden', alignSelf: "center", },


  homepageTextPodMapou: {
    fontSize: 20,
    top: 215,
    textAlign: "left",
    fontFamily: 'RubikWetPaint-Regular',
    color: "black",
    fontWeight: 300,
    left: 30,
  },

  // POD MAPOU CONTAINER
  
  scrollContainer: {
    position: 'absolute',
    top: 615,
    left: 10,
    width: '100%',
    height: '18%',
  },
  
  scrollContentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '200%',
  },
  
  box: {
    width: "14%",
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '3%',
    borderRadius: 15,
    elevation: 3,
    borderColor: "black",
    borderWidth: 1,
  },


  boxText: {
    color: 'black',
    textAlign: 'center',
  },


  boxText2: {
    color: '#FF4200',
    textAlign: 'center',
  },

    // KONEC POD MAPOU CONTAINER




});