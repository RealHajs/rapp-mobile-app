import React, { useEffect, useState } from 'react';
import { Text, ImageBackground, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import LottieView from 'lottie-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { supabase } from '../../../supabaseClient';
import { ThemedText } from '@/components/ThemedText';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  Zaznamy: undefined;
  Registrace: undefined;
  Aktivity: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export default function WelcomePage({ navigation }: HomeScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const router = useRouter(); 

  useEffect(() => {
    const checkSession = async () => {
      const session = await AsyncStorage.getItem('userToken');
      if (session) {
        setIsLoggedIn(true); // User is logged in
        router.push('/aktivity'); // Redirect to 'aktivity' if logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
        setIsLoading(false); // Finish loading
      }
    };

    checkSession();
  }, [router]);

  if (isLoading || isLoggedIn) {
    return (
      <View style={styles.preloadAnimacaContainer}>
        <LottieView
          source={require('../../../assets/animations/cat-animation.json')}
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
        <Text style={styles.hlavnitext}>SPRINT<Text style={styles.hlavnitextSecond}>IFY</Text></Text>
        <Text style={styles.hlavnitext2}>Chase your dreams with every step</Text>

        <View>
          <Image source={require('../../../assets/images/bezci.png')} style={styles.obrazekhomepage1} />
        </View>

        <TouchableOpacity style={styles.hlavnibutton}>
          <Link href="./registrace">
            <ThemedText style={styles.hlavnibuttontext} type="link">GET STARTED</ThemedText>
          </Link>
        </TouchableOpacity>

        <Text style={styles.loginTextPodButtonem}>
          Do you have an account yet? |
          <Link href="./login">
            <Text style={styles.loginTextPodButtonem2}>log-in</Text>
          </Link>
        </Text>
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
    backgroundColor: 'whitesmoke',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  hlavnitext: {
    fontSize: 40,
    color: '#FF4200',
    position: 'absolute',
    top: -250,
    left: -150,
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
    top: -200,
    left: -150,
    fontWeight: '400',
    fontFamily: 'RubikWetPaint-Regular',
    textAlign: 'left',
  },
  obrazekhomepage1: {
    padding: 10,
    borderRadius: 20,
    width: 300,
    height: 300,
    alignSelf: 'center',
    position: 'absolute',
    top: -135,
    justifyContent: 'center',
  },
  hlavnibutton: {
    backgroundColor: '#ff4200',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: 240,
    height: 60,
    alignSelf: 'center',
    position: 'absolute',
    top: 230,
    justifyContent: 'center',
  },
  hlavnibuttontext: {
    color: '#FEF3E2',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  loginTextPodButtonem: {
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    top: 305,
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