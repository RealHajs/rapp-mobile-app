import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const date = now.toLocaleDateString('cs-CZ');
      const day = now.toLocaleDateString('cs-CZ', { weekday: 'long' });
      setCurrentTime(time);
      setCurrentDate(date);
      setCurrentDay(day.charAt(0).toUpperCase() + day.slice(1)); // První písmeno velké
    };

    updateTime(); // Hned první spuštění
    const interval = setInterval(updateTime, 1000); // Aktualizace každou sekundu

    return () => clearInterval(interval); // Vyčištění intervalu při odchodu
  }, []);

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