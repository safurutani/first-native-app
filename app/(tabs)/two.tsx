import React from 'react';
import { StyleSheet, FlatList, Pressable, ListRenderItem } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { ArchivedGame } from '@/components/ArchivedGame';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function TabTwoScreen() {
  const state = useSelector((state: RootState) => state.game);
  const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archived Games</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList 
        data={state.games}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item}) => (
        <Pressable onPress={()=> {
          navigation.navigate('GameScreen', {game: item});
          console.log(JSON.stringify(item));
          }}>
          <ArchivedGame game={item} />
        </Pressable>
        )}
      />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
