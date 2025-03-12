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

    <Text style={styles.nahoreVelky}>Running at 
      <Text style={styles.nahoreVelky2}> Digulis Park</Text>
    </Text>

    <Text style={styles.nahoreMalyPodVelkym}>Tuesday 10th - 6:18 PM</Text>



      <MapView style={styles.map}>
        {locations.length > 0 && <Polyline coordinates={locations} strokeWidth={4} strokeColor='purple' />}
        {location && <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title='Tvoje poloha' />}
      </MapView>

      <View style={styles.statBox}><Text style={styles.statTitle}>Čas</Text><Text style={styles.stat}>{elapsedTime} s</Text></View>
      <View style={styles.statBox2}><Text style={styles.statTitle}>Vzdálenost</Text><Text style={styles.stat}>{distance.toFixed(2)} m</Text></View>
      <View style={styles.statBox3}><Text style={styles.statTitle}>Průměrná rychlost</Text><Text style={styles.stat}>{averageSpeed.toFixed(2)} km/h</Text></View>
      <View style={styles.statBox4}><Text style={styles.statTitle}>Nadmořská výška</Text><Text style={styles.stat}>{altitude.toFixed(2)} m</Text></View>

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
  container: { flex: 1, backgroundColor: 'white', padding: 0 },
  map: { width: '95%', height: '75%', top: "22.5%", borderRadius: 40, overflow: 'hidden', alignSelf: "center", },

  nahoreVelky: { top: "10%", alignSelf: "center", textAlign: "center", position: "absolute", fontSize: 25, fontWeight: 400 },
  nahoreVelky2: { color: "#FF4200", },
  nahoreMalyPodVelkym: { top: "14.5%", alignSelf: "center", textAlign: "center", position: "absolute", fontSize: 15, color: "gray", fontWeight: 200 },

  statBox:  { borderColor: "black", borderWidth: 1, backgroundColor: 'whitesmoke', borderRadius: 15, padding: 15, width: 115, top: -110, left: "5%", height: 120, opacity: 0.7, },
  statBox2: { borderColor: "black", borderWidth: 1, backgroundColor: 'whitesmoke', borderRadius: 15, padding: 15, width: 115, top: -230, left: "35%", height: 120, opacity: 0.7, },
  statBox3: { borderColor: "black", borderWidth: 1, backgroundColor: 'whitesmoke', borderRadius: 15, padding: 15, width: 115, top: -350, left: "65%", height: 120, opacity: 0.7, },
  statBox4: { borderColor: "black", borderWidth: 1, backgroundColor: 'whitesmoke', borderRadius: 15, padding: 15, width: "90%", top: -340, left: "5%", height: 80, opacity: 0.7, },

  statTitle: { color: 'black', fontSize: 14, fontWeight: 'bold' },
  stat: { color: 'black', fontSize: 18, fontWeight: 'bold' },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  button: { paddingVertical: 15, paddingHorizontal: 50, borderRadius: 20, alignItems: 'center' },
  
  startButton: { backgroundColor: 'green', top: -430, left: "22.5%", height: 60, width: 150, },
  stopButton: { backgroundColor: 'red', top: -430, left: "22.5%", height: 60, width: 150, },
  pauseButton: { backgroundColor: 'orange', top: -430, left: "22.5%", height: 60, width: 150, },
  unpauseButton: { backgroundColor: '#ffcc66', top: -430, left: "22.5%", height: 60, width: 150, },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
