import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../supabaseClient';
import { Ionicons } from '@expo/vector-icons'; // Trash ikona

interface Activity {
  id: string;
  distance: number;
  time: number;
  created_at: string;
}

export default function Zaznamy() {
  const [activities, setActivities] = useState<Activity[]>([]);

  // ✅ Načtení aktivit
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Chyba při získání uživatele:', userError.message);
      return;
    }

    if (!user) {
      console.error('Nepřihlášený uživatel.');
      return;
    }

    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Chyba při načítání aktivit:', error.message);
    } else {
      setActivities(data as Activity[]);
    }
  };

  // ✅ Smazání záznamu
  const deleteActivity = async (id: string) => {
    const { error } = await supabase.from('activities').delete().eq('id', id);

    if (error) {
      console.error('Chyba při mazání:', error.message);
      Alert.alert('Chyba', 'Záznam se nepodařilo smazat.');
    } else {
      Alert.alert('Úspěch', 'Záznam byl smazán.');
      fetchActivities(); // Obnovíme seznam
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Záznamy běhů</Text>

        {activities.length === 0 ? (
          <Text style={styles.noDataText}>Zatím žádné záznamy</Text>
        ) : (
          activities.map((activity) => (
            <View key={activity.id} style={styles.record}>
              <View style={styles.recordContent}>
                <View>
                  <Text style={styles.recordText}>Datum: {formatDate(activity.created_at)}</Text>
                  <Text style={styles.recordText}>Vzdálenost: {activity.distance.toFixed(2)} m</Text>
                  <Text style={styles.recordText}>Čas: {formatTime(activity.time)}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteActivity(activity.id)}>
                  <Ionicons name="trash-bin-outline" size={28} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 80,
  },
  record: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  recordContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 50,
  },
});