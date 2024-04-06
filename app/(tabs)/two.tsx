import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, FlatList, Pressable, Modal } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ArchivedGame } from '@/components/ArchivedGame';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../reducers';
import { LOAD_GAME_STATE, REMOVE_GAME } from '../reducers';
import CustomHeader from '@/components/InfoHeader';

export default function TabTwoScreen() {
  const state = useSelector((state: RootState) => state.game) ?? {games:[]};
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState(false);
  const [gameId, setGameId] = useState<string>();

  useEffect(()=> {
    if (state.games == undefined) {
      dispatch({type: LOAD_GAME_STATE, payload: {games:[]}});
    }
  })
  useLayoutEffect(()=> {
    navigation.setOptions({
      headerRight: () => (
        <CustomHeader onPress={()=> navigation.navigate('modal')} />
      ),
    });
  }, [navigation]);
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const removeGame = (id: string) => {
    togglePopup();
    setGameId(id);
    console.log(gameId);
  }
  return (
    <View style={styles.container} >
      <Modal
        visible={popupVisible} 
        transparent 
        animationType='fade' 
        onRequestClose={() => setPopupVisible(false)}
      >
        <View style={styles.centered}>
          <View style={styles.modal}>
            <Text style={[styles.text, {textAlign: 'center', padding: 8}]}>Are you sure you want to delete this game?</Text>
            <View style={styles.row}>
                <Pressable style={styles.button} onPress={()=>{
                    dispatch({type: REMOVE_GAME, payload: gameId });
                    togglePopup();
                }}><Text style={styles.text}>Yes</Text></Pressable>
                <Pressable style={styles.button} onPress={() => {togglePopup()}}><Text style={styles.text}>No</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList 
        style={styles.listContainer}
        data={state.games}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item, index}) => (
        <Pressable 
          onPress={()=> {
            navigation.navigate('gamescreen', {game: item});
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
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginVertical:'auto',
    height: '100%',
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
    height: 200,
    width: '80%',
    backgroundColor: 'white',
    zIndex: 2,
    borderColor: 'darkred',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'space-evenly',
    shadowColor: 'red',
    shadowRadius: 10,
    shadowOpacity: .8
  },
  button: {
    borderWidth: 2,
    borderColor: 'darkred',
    borderRadius: 5,
    paddingHorizontal: 24,
    paddingVertical: 6,
    marginTop: 8,
    height: 48,
    minWidth: 48,
    justifyContent: 'center',
    fontSize: 24,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 20
  }
});
