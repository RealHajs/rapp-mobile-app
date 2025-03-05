import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import React from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Toto je error page!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">The page is not found ! [404]</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go back</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
