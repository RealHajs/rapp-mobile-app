import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// icons
import Feather from '@expo/vector-icons/Feather';

export default function HomeScreen() {
  



  return (
    <View>
      
      <Feather name="settings" style={styles.homepageIconTopSettings} />
      <Text style={styles.homepageMainText}>Become Healty & Stay Resilient.</Text>

    </View>
  );
}




const styles = StyleSheet.create({


  homepageIconTopSettings: {
    fontSize: 30,
    top: 80,
    color: "black",
    left: 30,
  },

  homepageMainText:{
    fontSize: 40,
    top: 100,
    textAlign: "left",
    alignSelf: "center",
    fontFamily: 'RubikWetPaint-Regular',
    color: "black",
    fontWeight: 300,
    left: 10,
    marginRight: 20,
  },
  
});