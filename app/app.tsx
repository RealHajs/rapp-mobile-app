import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './(tabs)/index';
import Aktivity from './(tabs)/aktivity';
import Zaznamy from './(tabs)/zaznamy';
import Nastaveni from './(tabs)/nastaveni';
import Registrace from "./pages/registrace";


type RootStackParamList = {
  Home: undefined;
  Aktivity: undefined;
  Zaznamy: undefined;
  Nastaveni: undefined;
  Registrace: undefined;
};

// const Stack = createStackNavigator<RootStackParamList>();
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Homescreen" component={HomeScreen} />
        <Stack.Screen name="Aktivity" component={Aktivity} />
        <Stack.Screen name="Zaznamy" component={Zaznamy} />
        <Stack.Screen name="Nastaveni" component={Nastaveni} />
        <Stack.Screen name="Registrace" component={Registrace} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
