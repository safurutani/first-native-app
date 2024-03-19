import { Image, Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LetterPyramid } from '@/components/LetterPyramid';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import GameScreen from '../GameScreen';



export default function TabOneScreen() {
  //display curent date in the Jan 1, 2024 format
  const currentDate: Date = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate: string = currentDate.toLocaleDateString('en-US', options);
  
  const [inputLetters, setInputLetters] = useState('');
  const [criticalLetter, setCriticalLetter] = useState('');
  const [selectedLetters, setSelectedLetters] = useState('');

  const handleInputChange = (text: string) => {
    setInputLetters(text.toUpperCase());
    //updateSelectedLetters(text.toUpperCase(), criticalLetter);
  };
  const handleCriticalInputChange = (text: string) => {
    setCriticalLetter(text.toUpperCase());
    //updateSelectedLetters(inputLetters, text.toUpperCase());
  };
  const updateSelectedLetters = () => {
    setSelectedLetters(inputLetters + criticalLetter);
  };
  const navigation = useNavigation<StackNavigationProp<any>>();
  const handleStartSmithing = () => {
    if (inputLetters.length !== 6 || new Set(inputLetters).size !== 6) {
      alert('Please enter 6 unique letters.');
      return;
    }
    if (criticalLetter.length !== 1 || inputLetters.includes(criticalLetter)) {
      alert('Please enter a single critical letter that is unique from the other 6.');
      return;
    }
    updateSelectedLetters();

    console.log(selectedLetters);
    console.log(inputLetters);
    console.log(criticalLetter);

    Keyboard.dismiss();
    navigation.navigate('GameScreen', {selectedLetters: selectedLetters});
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Smithing Materials</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Text>Enter 6 unique letters:</Text>
          <TextInput style={styles.letterInput} value={inputLetters} maxLength={6} autoCapitalize='characters'
        onChangeText={handleInputChange}/>
          <Text>Enter 1 unique critical letter:</Text>
          <TextInput style={styles.criticalLetterInput} value={criticalLetter} maxLength={1} autoCapitalize='characters'
        onChangeText={handleCriticalInputChange}/>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smithButton} onPress={handleStartSmithing}>
            <Text>Start Smithing</Text>
            <FontAwesome style={styles.smithButtonImage} name='gavel' size={20}/>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <LetterPyramid letters={selectedLetters}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    justifyContent: 'center',
    marginLeft: '10%',
  },
  letterInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
    width: 140,
    height: 30,
    textAlign: 'center',
  },
  criticalLetterInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
    width: 40,
    height: 30,
    textAlign: 'center',
    justifyContent: 'center',
  },
  searchWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderColor: 'blue',
    width: 'auto',
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 220,
    borderColor: 'red',
    width:'auto',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
  },
  smithButton: {
    width: 140,
    height: "auto",
    borderColor: 'blue',
    justifyContent: 'center',
    backgroundColor: 'lightskyblue',
    flexDirection: 'row',
    padding: 8,
    marginHorizontal:'auto',
  },
  smithButtonImage: {
    marginLeft: 6,
  }
});
