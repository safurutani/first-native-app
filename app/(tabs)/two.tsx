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
      <FlatList 
        style={styles.listContainer}
        data={state.games}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item, index}) => (
        <Pressable 
          onPress={()=> {
            navigation.navigate('GameScreen', {game: item});
            console.log(JSON.stringify(item));
          }}
          style={styles.archivedGame}
        >
          <ArchivedGame game={item} />
          {index !== state.games.length-1 &&
            <View style={styles.gameSeparator} lightColor="gray" darkColor="rgba(255,255,255,0.1)" />
            }
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
    backgroundColor: '#649B92',
  },
  listContainer: {
    borderWidth: 1,
    borderColor: '#006B61',
    borderRadius: 5,
    height: '85%',
    backgroundColor: 'white',
    marginVertical: 5,
    width: 260,
    shadowColor: '#006B61',
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  archivedGame: {
    marginVertical: 4,
    
  },
  gameSeparator: {
    height: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
