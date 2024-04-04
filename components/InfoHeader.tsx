import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable, StyleSheet, GestureResponderEvent } from 'react-native';

export interface CustomHeaderProps {
    onPress: () => void
}
const CustomHeader = ({ onPress }: CustomHeaderProps) => (
  <View style={styles.container}>
    <Pressable onPress={onPress}>
      <FontAwesome name='info-circle' size={20} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
});

export default CustomHeader;