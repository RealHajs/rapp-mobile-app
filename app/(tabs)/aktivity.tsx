import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import haversine from 'haversine-distance';

export default function Aktivity() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [maxSpeed, setMaxSpeed] = useState<number>(0);
  const [averageSpeed, setAverageSpeed] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [altitude, setAltitude] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [locations, setLocations] = useState<{ latitude: number; longitude: number }[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const watchId = useRef<Location.LocationSubscription | null>(null);
  let prevLocation: { latitude: number; longitude: number } | null = null;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    })();
  }, []);

  useEffect(() => {
    if (isRunning && !isPaused && startTime) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, isPaused, startTime]);

  const startRun = async () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    setLocations([]);
    setDistance(0);
    setSpeed(0);
    setMaxSpeed(0);
    setAverageSpeed(0);

    watchId.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 500,
        distanceInterval: 1,
      },
      (newLocation) => {
        if (isPaused) return;

        const { latitude, longitude, speed, altitude } = newLocation.coords;
        setLocation(newLocation);

        const currentSpeed = Math.max(0, (speed ?? 0) * 3.6);
        setSpeed(currentSpeed);
        setMaxSpeed((prev) => Math.max(prev, currentSpeed));
        setLocations((prev) => [...prev, { latitude, longitude }]);
        setAltitude(altitude ?? 0);

        if (prevLocation) {
          const distanceIncrease = haversine(prevLocation, { latitude, longitude });
          setDistance((prev) => prev + distanceIncrease);
        }

        if (startTime) {
          const elapsedTime = (Date.now() - startTime) / 1000;
          if (elapsedTime > 0) {
            setAverageSpeed((distance / elapsedTime) * 3.6);
          }
        }
        prevLocation = { latitude, longitude };
      }
    );
  };

  const stopRun = () => {
    if (watchId.current) {
      watchId.current.remove();
      watchId.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {locations.length > 0 && <Polyline coordinates={locations} strokeWidth={4} strokeColor='purple' />}
        {location && <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title='Tvoje poloha' />}
      </MapView>

      <View style={styles.statsRow}>
        <View style={styles.statBox}><Text style={styles.statTitle}>Čas</Text><Text style={styles.stat}>{elapsedTime} s</Text></View>
        <View style={styles.statBox}><Text style={styles.statTitle}>Vzdálenost</Text><Text style={styles.stat}>{distance.toFixed(2)} m</Text></View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statBox}><Text style={styles.statTitle}>Průměrná rychlost</Text><Text style={styles.stat}>{averageSpeed.toFixed(2)} km/h</Text></View>
        <View style={styles.statBox}><Text style={styles.statTitle}>Nadmořská výška</Text><Text style={styles.stat}>{altitude.toFixed(2)} m</Text></View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, isRunning ? styles.stopButton : styles.startButton]} onPress={isRunning ? stopRun : startRun}>
          <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        {isRunning && (
          <TouchableOpacity style={[styles.button, isPaused ? styles.unpauseButton : styles.pauseButton]} onPress={togglePause}>
            <Text style={styles.buttonText}>{isPaused ? 'Unpause' : 'Pause'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 0 },
  map: { width: '100%', height: '65%', borderRadius: 15, overflow: 'hidden' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  statBox: { flex: 1, backgroundColor: '#1e1e1e', borderRadius: 15, padding: 15, marginHorizontal: 5, alignItems: 'center' },
  statTitle: { color: '#bbb', fontSize: 14, fontWeight: 'bold' },
  stat: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  button: { paddingVertical: 15, paddingHorizontal: 50, borderRadius: 20, alignItems: 'center' },
  startButton: { backgroundColor: 'green' },
  stopButton: { backgroundColor: 'red' },
  pauseButton: { backgroundColor: 'orange' },
  unpauseButton: { backgroundColor: '#ffcc66' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
