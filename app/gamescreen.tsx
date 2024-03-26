import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
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
  const [totalScore, setTotalScore] = useState(0);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const criticalLetter = selectedLetters[selectedLetters.length - 1];
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  
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
    setFoundWords(updatedFoundWords);
    setTotalScore(updatedTotalScore);

    const updatedGame = {
      ...game,
      score: updatedTotalScore,
      foundWords: updatedFoundWords
    };   
  
    dispatch({ type: UPDATE_SCORE, payload: { id: game.id, score: updatedTotalScore } });
    dispatch({ type: UPDATE_FOUND_WORDS, payload: { id: game.id, foundWords: updatedFoundWords } });
    setErrorMessage("");
    setCurrentWord("");
  };
  const scoreWord = (word: string, pangram: boolean) => {  
    if (word.length == 4) {
      return 1;
    }
    else {
      var score = word.length;
      if (pangram) {
        score += 7; 
      }
    }
    console.log(`score: ${score}`)
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
          <Text style={styles.text}>Score: {totalScore}</Text>
          <Text style={styles.error}>{errorMessage}</Text>
          <View>
          <Text style={styles.currentWord}>{currentWord}</Text>
          </View>
          
          <LetterPyramid letters={game.letters + game.criticalLetter} letter={''} handleLetterPress={handleLetterPress}/>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={clearCurrentWord}>
              <Text style={styles.text}>Clear</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={deleteLetter}>
              <Text style={styles.text}>Delete</Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={styles.button} onPress={submitWord}>
              <Text style={styles.text}>Submit</Text>
            </Pressable>
          </View>
          <View style={styles.foundWordContainer}>
            {foundWords.map((word:string, index: number) => (
              <Text style={styles.foundWords} key={index}>
                {word}
              </Text>
            ))}
            
          </View>
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
  },
  error: {
    color: 'red',
    height: 40,
    fontSize: 24,
  },
  currentWord: {
    height: 60,
    fontSize: 30,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 100,
    textAlign: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 400,
    justifyContent: 'space-around',
    marginVertical: 60,
  },
  foundWords: {
    margin: 2,
  },
  foundWordContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '50%',
    marginHorizontal: 'auto',
    borderColor: 'black',
    borderRadius: 5,
    padding: 8,
    borderWidth: 1,
    marginTop: 20,
    minHeight: 40,
  }
});
