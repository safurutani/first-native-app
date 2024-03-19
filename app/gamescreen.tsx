import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GameScreenProps {
  selectedLetters: string;
}

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <Text>Game Screen</Text>
      {/* Add your game content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
