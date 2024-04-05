import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable, StyleSheet, GestureResponderEvent } from 'react-native';

export interface CustomHeaderProps {
    onPress: () => void
}
const CustomHeader = ({ onPress }: CustomHeaderProps) => (
  <View style={styles.container}>
    <Pressable onPress={onPress} style={styles.icon}>
      <FontAwesome name='info-circle' size={20} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  icon: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CustomHeader;