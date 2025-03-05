import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';


export default function Zaznamy() {
  return (
    <View style={styles.container}>
      <Link href='../pages/login'>
        <Text>Zaznamy!</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
