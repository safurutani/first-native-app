import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LetterPyramid } from '@/components/LetterPyramid';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';
interface GameScreenProps {
  selectedLetters: string;
}

export default function GameScreen({route}: {route: any}) {
  const {selectedLetters} = route.params;

  return (
    <View style={styles.container}>
      <Text>Game Screen</Text>
      <LetterPyramid letters={selectedLetters} />
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
