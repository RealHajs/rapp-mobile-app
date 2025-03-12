import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// FRAMEWORK NA IKONY
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#232323',
          padding: 8,
        },
      }}>


    {/* home */}
    <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Domů',
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons name="home" size={24} color={color} />
          ),
        }}
      />


    {/* Aktivity */}
      <Tabs.Screen
        name="aktivity"
        options={{
          title: 'Aktivity',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name={focused ? 'linechart' : 'linechart'} size={20} color={color} />
          ),
        }}
      />


      {/* Záznamy */}
      <Tabs.Screen
        name="zaznamy"
        options={{
          title: 'Záznamy',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="book" size={24} color={color} />          
          ),
        }}
      />

        {/* Nastavení */}
      <Tabs.Screen
        name="nastaveni"
        options={{
          title: 'Nastavení',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="settings" size={24} color={color} />          
          ),
        }}
      />


  



    </Tabs>
  );
}
