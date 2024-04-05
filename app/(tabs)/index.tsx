import { Keyboard, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useLayoutEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ADD_GAME, Game, GameAction } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { saveState } from '../storage';
import { Dispatch } from '@reduxjs/toolkit';
import CustomHeader from '@/components/InfoHeader';


export default function TabOneScreen() {
  //display curent date in the Jan 1, 2024 format
  const currentDate: Date = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate: string = currentDate.toLocaleDateString('en-US', options);
  
  const [inputLetters, setInputLetters] = useState('');
  const [criticalLetter, setCriticalLetter] = useState('');
  const navigation = useNavigation<StackNavigationProp<any>>();
  const state = useSelector((state: RootState) => state.game) ?? {games: []};
  const dispatch = useDispatch<Dispatch<GameAction>>();
  
  useLayoutEffect(()=> {
    navigation.setOptions({
      headerRight: () => (
        <CustomHeader onPress={()=> navigation.navigate('modal')} />
      ),
    });
  }, [navigation]);

  const handleInputChange = (text: string) => {
    setInputLetters(text.toUpperCase());
  };
  const handleCriticalInputChange = (text: string) => {
    setCriticalLetter(text.toUpperCase());
  };
  const  generateUniqueId = () => {
    const timeStamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2);
    return timeStamp + randomNum;
  };

  const handleStartSmithing = async () => {
    if (inputLetters.length !== 6 || new Set(inputLetters).size !== 6) {
      alert('Please enter 6 unique letters.');
      return;
    }
    if (criticalLetter.length !== 1 || inputLetters.includes(criticalLetter)) {
      alert('Please enter a single critical letter that is unique from the other 6.');
      return;
    }
    if (state.games?.length > 0) {
      const isDuplicate = state.games.some((game: Game) => {
        const gameLetters = game.letters || ''; 
        const sortedGameLetters = gameLetters.split('').sort().join('');
        const sortedInputLetters = inputLetters.split('').sort().join('');
        
        return sortedGameLetters === sortedInputLetters && game.criticalLetter === criticalLetter;
      });
      if (isDuplicate) {
          alert("A game with this combination of letters already exists.")
          return;
        }
    }
    
    const newGame = {
      id: generateUniqueId(),
      score: 0,
      letters: inputLetters,
      criticalLetter: criticalLetter,
      foundWords: [],
      dateCreated: formattedDate
    };
    dispatch({type: ADD_GAME, payload: newGame});
    saveState(state.games);
    setInputLetters('');
    setCriticalLetter('');
    Keyboard.dismiss();
    navigation.navigate('GameScreen', {selectedLetters: inputLetters + criticalLetter, game: newGame});
  };

  return (
    <View style={styles.container}>
        <View style={styles.title}>
          <Text accessibilityLabel='Smithing Materials' style={styles.title}>Smithing Materials</Text>
        </View>        
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Text accessibilityLabel='Enter 6 unique letters' style={styles.prompt}>Enter 6 unique letters:</Text>
            <TextInput style={styles.letterInput} value={inputLetters} maxLength={6} autoCapitalize='characters'
          onChangeText={handleInputChange}/>
            <Text accessibilityLabel='Enter 1 unique critical letter' style={styles.prompt}>Enter 1 unique critical letter:</Text>
            <TextInput style={styles.criticalLetterInput} value={criticalLetter} maxLength={1} autoCapitalize='characters'
          onChangeText={handleCriticalInputChange}/>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.smithButton} onPress={handleStartSmithing}>
              <Text accessibilityLabel='Start Smithing' style={styles.smithText}>Start Smithing</Text>
              <FontAwesome style={styles.smithButtonImage} name='gavel' size={20}/>
          </Pressable>
        </View>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#649B92',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    width: 400,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  prompt: {
    fontSize: 18,
  },
  letterInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
    width: 140,
    height: 48,
    textAlign: 'center',
    fontSize: 22,
  },
  criticalLetterInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
    width: 48,
    height: 48,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 22,
    backgroundColor: 'gold',
  },
  searchWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderColor: 'blue',
    width: 400,
    backgroundColor: 'white',
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 220,
    maxWidth:400,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
    paddingBottom: 14,
    width: 400,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  smithText: {
    color: 'white',
    fontSize: 18,
  },
  smithButton: {
    width: 160,
    height: 48,
    borderColor: 'blue',
    justifyContent: 'center',
    backgroundColor: '#006B61',
    flexDirection: 'row',
    padding: 8,
    marginHorizontal:'auto',
    borderRadius: 5,
    alignItems: 'center',
  },
  smithButtonImage: {
    marginLeft: 6,
    color: 'white',
  }
});
