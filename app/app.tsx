import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

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

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        {/* tabs */}
        <Stack.Screen name="Homescreen" component={HomeScreen} />
        <Stack.Screen name="Aktivity" component={Aktivity} />
        <Stack.Screen name="Zaznamy" component={Zaznamy} />
        <Stack.Screen name="Nastaveni" component={Nastaveni} />

        {/* untabs */}
        <Stack.Screen name="Registrace" component={Registrace} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
