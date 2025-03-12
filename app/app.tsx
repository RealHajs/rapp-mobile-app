import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';

//tabs
import HomeScreen from './(tabs)/HomeScreen';
import Aktivity from './(tabs)/aktivity';
import Zaznamy from './(tabs)/zaznamy';
import Nastaveni from './(tabs)/nastaveni';

//pages
import Registrace from "./pages/unLogin/registrace";
import Login from "./pages/unLogin/login";
import WelcomePage from "./pages/unLogin/welcomePage";

type RootStackParamList = {
  //tabs
  HomeScreen: undefined;
  Aktivity: undefined;
  Zaznamy: undefined;
  Nastaveni: undefined;

  //untabs
  Registrace: undefined;
  Login: undefined;
  WelcomePage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">

          {/* tabs */}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Aktivity" component={Aktivity} />
          <Stack.Screen name="Zaznamy" component={Zaznamy} />
          <Stack.Screen name="Nastaveni" component={Nastaveni} />

          {/* untabs */}
          <Stack.Screen name="Registrace" component={Registrace} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="WelcomePage" component={WelcomePage} />

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({


});