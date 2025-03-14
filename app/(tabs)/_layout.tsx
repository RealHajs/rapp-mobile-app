import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// FRAMEWORK NA IKONY
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,

        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',



        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          padding: 8,
          marginTop: -70,
          width: 350,
          alignSelf: "center",
          borderRadius: 20,
          height: 70,
          borderWidth: 2,
          borderColor: "black",
          top: -30,
        },

        tabBarLabelStyle: {
          marginTop: 7,
        },


      }}>


    {/* home */}
    <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons name="home" size={24} top={5} color={"black"} />
          ),
        }}
      />


    {/* Aktivity */}
      <Tabs.Screen
        name="aktivity"
        options={{
          title: 'Activities',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name={focused ? 'linechart' : 'linechart'} size={20} top={5} color={"black"} />
          ),
        }}
      />


      {/* Záznamy */}
      <Tabs.Screen
        name="zaznamy"
        options={{
          title: 'Datas',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="book" size={24} top={5} color={"black"} />          
          ),
        }}
      />

        {/* Nastavení */}
      <Tabs.Screen
        name="nastaveni"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="settings" size={24} top={5} color={"black"} />          
          ),
        }}
      />


  



    </Tabs>
  );
}
