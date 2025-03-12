import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../../supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');
  const [checkingSession, setCheckingSession] = useState<boolean>(true);

  // Kontrola přihlášení a hodiny
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Pokud není přihlášen, přesun na welcomePage
        navigation.replace('WelcomePage');
      } else {
        // Pokud je přihlášen, spustí hodiny
        const updateTime = () => {
          const now = new Date();
          const time = now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const date = now.toLocaleDateString('cs-CZ');
          const day = now.toLocaleDateString('cs-CZ', { weekday: 'long' });
          setCurrentTime(time);
          setCurrentDate(date);
          setCurrentDay(day.charAt(0).toUpperCase() + day.slice(1));
        };

        updateTime(); // První načtení
        const interval = setInterval(updateTime, 1000); // Obnovuje každou sekundu
        return () => clearInterval(interval); // Vyčištění intervalu při zavření stránky
      }

      setCheckingSession(false); // Ukončí kontrolu
    };

    checkAuth();
  }, [navigation]);

  // Loader při kontrole session
  if (checkingSession) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF4200" />
      </View>
    );
  }

  // ✅ Zobrazí hodiny, pokud je přihlášený
  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{currentTime}</Text>
      <Text style={styles.dateText}>{currentDate}</Text>
      <Text style={styles.dayText}>{currentDay}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAF3',
    padding: 20,
  },
  timeText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FF4200',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 30,
    color: '#333',
    marginBottom: 10,
  },
  dayText: {
    fontSize: 24,
    color: '#555',
    fontStyle: 'italic',
  },
});