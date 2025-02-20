import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // MapView pro zobrazení mapy
import * as Location from 'expo-location'; // expo-location pro práci s geolokací

export default function Aktivity() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null); // Stavy pro uložení polohy
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // Stav pro uložení případné chyby
  const [speed, setSpeed] = useState<number | null>(null); // Stav pro uložení rychlosti
  const [altitude, setAltitude] = useState<number | null>(null); // Stav pro uložení nadmořské výšky

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Požádáme o oprávnění pro přístup k poloze
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied'); // Pokud není povolen přístup, zobrazíme chybu
        return;
      }
      
      // Nastavíme sledování polohy a rychlosti
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High, // Nastavení vysoké přesnosti
          timeInterval: 1000, // Získávání polohy každou sekundu
          distanceInterval: 1, // Získávání polohy po každém metru
        },
        (newLocation) => {
          setLocation(newLocation); // Uložení nové polohy
          setSpeed(newLocation.coords.speed); // Uložení rychlosti v metrech za sekundu
          setAltitude(newLocation.coords.altitude); // Uložení nadmořské výšky
        }
      );
    })();
  }, []);

  // Pokud je chyba s přístupem k lokaci
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  // Pokud ještě nemáme lokaci
  if (!location) {
    return <Text>Loading...</Text>;
  }

  // Převod rychlosti z m/s na km/h
  const speedInKmh = speed !== null ? (speed * 3.6).toFixed(2) : '0';
  const altitudeInMeters = altitude !== null ? altitude.toFixed(2) : '0'; // Nadmořská výška v metrech

  return (
    <View style={styles.container}>
      <Text>Aktuální rychlost: {speedInKmh} km/h</Text>
      <Text>Aktuální nadmořská výška: {altitudeInMeters} m</Text> {/* Zobrazení nadmořské výšky */}

      <MapView
        style={styles.map} // Nastavení stylu mapy
        initialRegion={{
          latitude: location.coords.latitude, // Šířka uživatele
          longitude: location.coords.longitude, // Délka uživatele
          latitudeDelta: 0.0922, // Rozsah pro šířku
          longitudeDelta: 0.0421, // Rozsah pro délku
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Jsi tady"
          description={`Aktuální rychlost: ${speedInKmh} km/h\nAktuální nadmořská výška: ${altitudeInMeters} m`}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
});