import React, { useEffect } from 'react';
import { StyleSheet, FlatList, Pressable, ListRenderItem } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ArchivedGame } from '@/components/ArchivedGame';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../store';
import { LOAD_GAME_STATE, REMOVE_GAME } from '../reducers';

export default function TabTwoScreen() {
  const state = useSelector((state: RootState) => state.game) ?? {games:[]};
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState(false);
  const [gameId, setGameId] = useState<number>();

  useEffect(()=> {
    if (state.games == undefined) {
      dispatch({type: LOAD_GAME_STATE, payload: {games:[]}});
    }
  })
  
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const removeGame = (id: number) => {
    togglePopup();
    setGameId(id);
    console.log(gameId);
  }
  return (
    <View style={styles.container} >
      {popupVisible && <View style={styles.modal}>
        <Text style={{textAlign: 'center'}}>Are you sure you want to delete this game?</Text>
        <View style={styles.row}>
            <Pressable style={styles.button} onPress={()=>{
                dispatch({type: REMOVE_GAME, payload: gameId });
                togglePopup();
            }}>Yes</Pressable>
            <Pressable style={styles.button} onPress={() => {togglePopup()}}>No</Pressable>
        </View>
      </View>
      }
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
          <ArchivedGame game={item} onPress={removeGame} />
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
  modal: {
    display: 'flex',
    height: 120,
    width: 240,
    position: 'absolute',
    marginVertical: 'auto',
    backgroundColor: 'white',
    zIndex: 2,
    borderColor: 'darkred',
    borderWidth: 2,
    borderRadius: 5,
    padding: 6
  },
  button: {
    borderWidth: 1,
    borderColor: 'darkred',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
