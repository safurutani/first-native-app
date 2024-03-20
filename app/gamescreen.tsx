import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { LetterPyramid } from '@/components/LetterPyramid';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';
interface GameScreenProps {
  selectedLetters: string; 
  letter: any
}

export default function GameScreen({route}: {route: any}) {
  const {selectedLetters} = route.params;
  const [errorMessage, setErrorMessage] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [points, setPoints] = useState(0);
  const [foundWords, setFoundWords] = useState<string[]>([])

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
    console.log(foundWords);
    console.log(currentWord);
    if (foundWords.some((word) => word === currentWord)) {
      setErrorMessage("You already smithed this word");
    }
    else if (currentWord.length < 4) {
      setErrorMessage("This word is too short");
    } 
    else if(!currentWord.includes(selectedLetters[selectedLetters.length - 1])) {
      setErrorMessage("You did not smith with the critical letter")
    }
    else {
      scoreWord(currentWord, checkPangram(currentWord));
      setFoundWords([...foundWords, currentWord]);
      setErrorMessage("");
    } 
    setCurrentWord("");
    
    /* lists all words found 
    foundWords.forEach(element => {
      console.log(element);
    });
    */
  };
  const scoreWord = (word: string, pangram: boolean) => {
    const size = word.length;
    var score = size - 3;
    if (pangram) {
      score = score + 7; 
    }
    setPoints(points + score);
  }
  const checkPangram = (word: string) => {
    const letterArray = selectedLetters.split("");
    var isPangram = true;
    console.log(word);
    letterArray.forEach((char: string) => {
      if(!word.includes(char)) {
        isPangram = false;
        
      }
    });
    return isPangram;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Score: {points}</Text>
      <Text style={styles.error}>{errorMessage}</Text>
      <View>
      <Text style={styles.currentWord}>{currentWord}</Text>
      </View>
      
      <LetterPyramid letters={selectedLetters} letter={''} handleLetterPress={handleLetterPress}/>
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
      {foundWords.map((word, index) => (
        <Text style={styles.foundWords} key={index}>
          {word}
        </Text>
      ))}
        
      </View>
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
