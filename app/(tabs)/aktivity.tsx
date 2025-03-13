import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import haversine from 'haversine-distance';

// icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

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

  // ✅ Funkce na formátovaný čas
  const formatElapsedTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const setiny = Math.floor((milliseconds % 1000) / 10);

    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(minutes)}:${pad(seconds)}:${pad(setiny)}`;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    })();
  }, []);

  // ✅ Čas v reálném čase
  useEffect(() => {
    if (isRunning && !isPaused && startTime) {
      const timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 50);
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
      <Text style={styles.nahoreVelky}>
        Running at <Text style={styles.nahoreVelky2}>Digulis Park</Text>
      </Text>
      <Text style={styles.nahoreMalyPodVelkym}>Tuesday 10th - 6:18 PM</Text>

      <MapView style={styles.map}>
        {locations.length > 0 && <Polyline coordinates={locations} strokeWidth={4} strokeColor='purple' />}
        {location && <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title='Tvoje poloha' />}
      </MapView>


      {/* ikony a tabs */}
      <View style={styles.statBox}>
        <FontAwesome6 style={styles.statTitle} name="arrow-up-from-ground-water" color="#FF4200" />
        <Text style={styles.stat}>{altitude.toFixed(2)}</Text>
      </View>

      <View style={styles.statBox2}>
        <MaterialCommunityIcons style={styles.statTitle} name="map-marker-distance" color="#FF4200" />
        <Text style={styles.stat}>{distance.toFixed(2)} m</Text>
      </View>

      <View style={styles.statBox3}>
        <Ionicons style={styles.statTitle} name="speedometer" color="#FF4200" />
        <Text style={styles.stat}>{averageSpeed.toFixed(2)} km</Text>
      </View>

      <View style={styles.statBox4}>
        <Text style={styles.stat2}>{formatElapsedTime(elapsedTime)}</Text>
      </View>

      {/* konec ikony a tabs */}


      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, isRunning ? styles.stopButton : styles.startButton]}
          onPress={isRunning ? stopRun : startRun}
        >
          <View>{isRunning ? <FontAwesome5 name="stop-circle" size={40} color="#FF4200" /> : <AntDesign name="play" size={40} color="black" />}</View>
        </TouchableOpacity>
        {isRunning && (
          <TouchableOpacity
            style={[styles.button, isPaused ? styles.unpauseButton : styles.pauseButton]}
            onPress={togglePause}
          >
            <View>{isPaused ? <AntDesign name="play" size={40} color="green" /> : <Feather name="pause" size={40} color="black" />}</View>
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

  statBox:  { borderColor: "black", borderWidth: 1, backgroundColor: 'white', borderRadius: 15, padding: 15, width: 115, top: -110, left: "5%", height: 120, opacity: 0.9, },
  statBox2: { borderColor: "black", borderWidth: 1, backgroundColor: 'white', borderRadius: 15, padding: 15, width: 115, top: -230, left: "35%", height: 120, opacity: 0.9, },
  statBox3: { borderColor: "black", borderWidth: 1, backgroundColor: 'white', borderRadius: 15, padding: 15, width: 115, top: -350, left: "65%", height: 120, opacity: 0.9, },
  statBox4: { borderColor: "black", borderWidth: 1, backgroundColor: 'white', borderRadius: 15, padding: 15, width: "90%", top: -340, alignSelf: "center", height: 80, opacity: 0.9, },

  statTitle: { color: '#FF4200', fontSize: 30, fontWeight: 'bold', textAlign: "center", marginTop: 5 },
  stat: { color: 'black', fontSize: 18, fontWeight: 'bold', marginTop: 25, textAlign: "center"},
  stat2: { color: 'black', fontSize: 22, fontWeight: 'bold', marginTop: 10, marginLeft: 10},

  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  button: { paddingVertical: 15, paddingHorizontal: 50, borderRadius: 20, alignItems: 'center' },
  
  startButton:{ top: -435, left: "25%" },
  stopButton: { top: -435, left: "35%" },
  pauseButton: { top: -435, left: "5%" },
  unpauseButton: { top: -435, left: "5%" },

  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
