import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { LetterPyramid } from '@/components/LetterPyramid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { UPDATE_FOUND_WORDS, UPDATE_SCORE } from './reducers'

interface GameScreenProps {
  route: any
}

export default function GameScreen({route}: {route: any}) {
  const {selectedLetters, game} = route.params;
  const [errorMessage, setErrorMessage] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [totalScore, setTotalScore] = useState(game.score);
  const [points, setPoints] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>(game.foundWords);
  const criticalLetter = selectedLetters[selectedLetters.length - 1];
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  
  useEffect(() => {
    if (points !== 0) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000); // 2000 milliseconds (2 seconds)
      return () => clearTimeout(timeout); // Cleanup function to clear the timeout
    }
  }, [points]);

  const buttonContainer = [
    Platform.OS === 'android' && styles.androidButtonContainer,
    Platform.OS === 'web' && styles.buttonContainer
  ]
  const addedScoreContainer = [
    Platform.OS === 'android' && styles.androidAddedScore,
    Platform.OS === 'web' && styles.addedScore,
  ]

  const handleLetterPress = (letter: any) => {
    setCurrentWord((prev) => prev + letter);
  };
  const deleteLetter = () => {
    setCurrentWord((prev) => prev.slice(0,prev.length-1) )
  }
  const clearCurrentWord = () => {
    setCurrentWord("");
  }
  const submitWord = () => {
    if (!game) {
      console.error("Game not found for selected letters and critical letters");
      return;
    }
  
    if (foundWords.some((word) => word === currentWord)) {
      setErrorMessage("You already smithed this word");
      setCurrentWord("");
      return;
    }
  
    if (currentWord.length < 4) {
      setErrorMessage("This word is too short");
      setCurrentWord("");
      return;
    }
  
    if (!currentWord.includes(game.criticalLetter)) {
      setErrorMessage("You did not smith with the critical letter");
      return;
    }
  
    const wordScore = scoreWord(currentWord, checkPangram(currentWord));
    const updatedFoundWords = [...foundWords, currentWord];
    const updatedTotalScore = totalScore + wordScore;
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    setFoundWords(updatedFoundWords);
    setTotalScore(updatedTotalScore);
  
    dispatch({ type: UPDATE_SCORE, payload: { id: game.id, score: updatedTotalScore } });
    dispatch({ type: UPDATE_FOUND_WORDS, payload: { id: game.id, foundWords: updatedFoundWords } });
    setErrorMessage("");
    setCurrentWord("");
  };
  const scoreWord = (word: string, pangram: boolean) => { 
    var score = word.length;
    if (timeoutId) {
      clearTimeout(timeoutId);
    } 
    if (word.length == 4) {
      score = 1;
      setPoints(1);
    }
    else {
      if (pangram) {
        score += 7; 
      }
    }
    const newTimeoutId = setTimeout(() => {
      setPoints(0); // Reset points after timeout
    }, 3000); // Timeout duration
    setTimeoutId(newTimeoutId);
    console.log(`score: ${score}`)
    setPoints(score);
    return score;
  }
  const checkPangram = (word: string) => {
    const letterArray = (game.letters + game.criticalLetter).split("");
    return letterArray.every((char: string) => word.includes(char));
  };
  return (
    <View style={styles.container}>
      {game && (
        <>
          <View style={styles.scoreContainer}>
            <Text style={[styles.text, styles.centeredText]}>Score: {totalScore}</Text>
            {isVisible && <Text style={[styles.text, addedScoreContainer]}>+{points}</Text>}
          </View>
          
          <Text style={styles.error}>{errorMessage}</Text>
          <View>
          <Text style={styles.currentWord}>{currentWord}</Text>
          </View>
          
          <LetterPyramid letters={game.letters + game.criticalLetter} letter={''} handleLetterPress={handleLetterPress}/>
          <View style={buttonContainer}>
            <View style={styles.editButtonContainer}>
              <Pressable style={styles.button} onPress={clearCurrentWord}>
                <Text style={styles.text}>Clear</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={deleteLetter}>
                <Text style={styles.text}>Delete</Text>
              </Pressable>
            </View>
            <View style={styles.submitContainer}>
              <Pressable style={styles.button} onPress={submitWord}>
                <Text style={styles.text}>Submit</Text>
              </Pressable>
            </View>
          </View>
          <FlatList 
            data={foundWords} 
            style={styles.foundWordContainer} 
            contentContainerStyle={styles.flexRow}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View>
                <Text style={styles.foundWords} key={index}>
                  {item}{'  \u2022 '}
                </Text>
              </View>
              
            )}>            
          </FlatList>
        </>
      )}   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    backgroundColor: '#649B92'
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  error: {
    color: 'darkred',
    height: 40,
    fontSize: 24,
    fontWeight: '500',
  },
  currentWord: {
    height: 60,
    fontSize: 30,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  centeredText: {
    flex: 1,
    justifyContent: 'center',
  },
  addedScore: {
    position: 'absolute',
    left: 120,
  },
  androidAddedScore: {
    position: 'absolute',
    left: 280,
  },
  button: {
    borderWidth: 1,
    borderColor: '#649B92',
    borderRadius: 5,
    width: 100,
    textAlign: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    backgroundColor: 'white'
  },
  editButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 400,
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  buttonContainer: {
    width: 400,
    margin: 0,
  },
  androidButtonContainer: {
    width: 400,
    margin: 0,
  },
  submitContainer: {
    alignItems: 'center',
  },
  foundWords: {
    margin: 2,
  },
  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  foundWordContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    maxWidth: '95%',
    width: 500,
    marginHorizontal: 'auto',
    borderColor: '#649B92',
    borderRadius: 5,
    padding: 8,
    borderWidth: 1,
    marginTop: 20,
    minHeight: 40,
    height: 180,
    maxHeight: '23%',
    backgroundColor: 'white',
    overflow:'hidden'
  }
});
