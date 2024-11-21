import React, { useEffect, useState } from 'react';
import { Text, ImageBackground, StyleSheet, TouchableOpacity, View, Button } from 'react-native';
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
        <Text style={styles.hlavnitext}>Make Your Body</Text>
        <Text style={styles.hlavnitext2}>Healthy & Fit</Text>
        <Text style={styles.druhytext}>Not everyone can wake up every day feeling energized and motivated.</Text>

      <TouchableOpacity style={styles.hlavnibutton}>
        <Link href="../pages/registrace">
          <ThemedText style={styles.hlavnibuttontext} type="link">Create an account</ThemedText>
        </Link>
      </TouchableOpacity>


        {/* <TouchableOpacity style={styles.hlavnibutton} onPress={() => navigation.navigate("Registrace")}>
          <Text style={styles.hlavnibuttontext}>Create an account</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.hlavnibutton2} onPress={() => navigation.navigate('Zaznamy')}>
          <Text style={styles.hlavnibuttontext2}>Continue with FaceBook</Text>
        </TouchableOpacity>

        <Text style={styles.mateucet}>Máte už vytvořený účet ? <Text style={styles.prihlasitse}> Přihlásit se</Text></Text>

        <Text style={styles.infooapp}>By proceeding, you acknowledge and consent to the collection, processing, and usage of your personal data as outlined in our 
          <Text style={styles.privacypolicy}>        Privacy Policy.</Text>
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
    backgroundColor: "#0B0B0B",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  hlavnitext: {
    fontSize: 45,
    color: '#FA4032',
    position: "absolute",
    top: -240,
    fontWeight: "600",
    fontFamily: 'RubikWetPaint-Regular',
    alignSelf: 'center',
    textAlign: "center",
  },
  hlavnitext2: {
    fontSize: 40,
    color: '#00FFCC',
    position: "absolute",
    top: -185,
    fontWeight: "600",
    fontFamily: 'RubikWetPaint-Regular',
    alignSelf: 'center',
    textAlign: "center",
  },
  druhytext: {
    fontSize: 15,
    color: 'white',
    position: "absolute",
    top: -120,
    fontWeight: "300",
    fontFamily: 'RubikWetPaint-Regular',
    alignSelf: 'center',
    textAlign: "center",
    marginHorizontal: 23,
  },
  hlavnibutton: {
    backgroundColor: '#FA4032',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: 300,
    height: 70,
    alignSelf: 'center',
    position: "absolute",
    top: 80,
    justifyContent: 'center', 
  },
  hlavnibuttontext: {
    color: '#FEF3E2',
    fontSize: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  hlavnibutton2: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: 300,
    height: 70,
    alignSelf: 'center',
    position: "absolute",
    top: 170,
    borderWidth: 2 ,
    borderColor: '#2F58CD',
  },
  hlavnibuttontext2: {
    color: '#4267B2',
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    top: 13,
  },
  mateucet: {
    fontSize: 10,
    color: 'white',
    position: "absolute",
    top: 260,
    fontFamily: 'RubikWetPaint-Regular',
    alignSelf: 'center',
    textAlign: "center",
    marginHorizontal: 23,
  },
  prihlasitse: {
    color: '#FA4032',
  },
  infooapp: {
    fontSize: 10,
    color: 'white',
    position: "absolute",
    top: 335,
    fontFamily: 'RubikWetPaint-Regular',
    alignSelf: 'center',
    textAlign: "center",
    marginHorizontal: 30,
    lineHeight: 15,
  },
  privacypolicy: {
    color: '#FA4032',
  },

});
