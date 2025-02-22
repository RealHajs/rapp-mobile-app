import React, { useEffect, useState } from 'react';
import { Text, ImageBackground, StyleSheet, TouchableOpacity, View, Button, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import LottieView from 'lottie-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import supabase from '../../supabaseClient';

import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';


type RootStackParamList = {
  Home: undefined;
  Zaznamy: undefined;
  Registrace: undefined;
};


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};



export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);


  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('registraceUzivatelu').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.preloadAnimacaContainer}>
        <LottieView
          source={require('../../assets/animations/cat-animation.json')}
          autoPlay
          loop={true}
          speed={1}
          style={styles.preloadAnimace}
        />
      </View>
    );
  }


  return (
    <ImageBackground style={styles.background}>
      <ThemedView>
        <Text style={styles.hlavnitext}>Sprintify</Text>
        <Text style={styles.hlavnitext2}>Chase your dreams with every step</Text>

        <View>
          <Image source={require('../../assets/images/bezci.png')} style={styles.obrazekhomepage1} />
        </View>


      <TouchableOpacity style={styles.hlavnibutton}>
        <Link href="../pages/registrace">
          <ThemedText style={styles.hlavnibuttontext} type="link">Start Running</ThemedText>
        </Link>
      </TouchableOpacity>



      </ThemedView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({



  preloadAnimacaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },


  preloadAnimace: {
    width: 200,
    height: 200,
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


  hlavnitext: {
    fontSize: 40,
    color: 'black',
    position: "absolute",
    top: -250,
    left: -170,
    fontWeight: "600",
    fontFamily: 'RubikWetPaint-Regular',
    textAlign: "left",
  },



  hlavnitext2: {
    fontSize: 15,
    color: 'black',
    position: "absolute",
    top: -200,
    left: -170,
    fontWeight: "500",
    fontFamily: 'RubikWetPaint-Regular',
    textAlign: "left",
  },


  obrazekhomepage1:{
    padding: 10,
    borderRadius: 20,
    width: 300,
    height: 300,
    alignSelf: 'center',
    position: "absolute",
    top: -135,
    justifyContent: 'center', 
  },


  hlavnibutton: {
    backgroundColor: '#ff4200',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: 300,
    height: 60,
    alignSelf: 'center',
    position: "absolute",
    top: 240,
    justifyContent: 'center', 
  },


  hlavnibuttontext: {
    color: '#FEF3E2',
    fontSize: 20,
    textAlign: "center",
    fontWeight: "500",
  },






 

});
