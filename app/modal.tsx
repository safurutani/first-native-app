import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How To Play</Text>
      <View style={styles.block}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <View style={styles.centered}>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Make as many words as you can from 7 letters</Text>
          </FontAwesome>          
        </View>
        <View style={styles.centered}>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Choose 7 unique letters, 1 will be the "critical" letter</Text>
          </FontAwesome>
        </View>
        <View style={styles.centered}>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Words must include the "critical" letter</Text>
          </FontAwesome>          
        </View>
        <View style={styles.centered}>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Score points based on how long the words are</Text>
          </FontAwesome>
        </View>
        <View style={styles.centered}>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  All letters may be used more than once</Text>
          </FontAwesome>
        </View>
        <View style={styles.centered}>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Words must be at least 4 letters long</Text>
          </FontAwesome>
        </View>
        <View style={styles.centered}>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Words must be in the English dictionary</Text>
          </FontAwesome>   
        </View>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Scoring</Text>
      <View style={styles.block}>
        <View style={styles.centered}>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  4 letter words are worth 1 point</Text>
          </FontAwesome>
        </View>
        <View style={styles.centered}>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Words longer than 4 letters are 1 point per letter</Text>
          </FontAwesome>   
        </View>
        <View style={styles.centered}>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Words using all 7 letters gain 7 bonus points</Text>
          </FontAwesome>          
        </View>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Example</Text>
      <View style={styles.block}>
        <View style={styles.exampleBox}>
            <View style={styles.letterRow}>
              <Text style={[styles.letters, styles.bold]}>ACHILT</Text>
              <Text style={[styles.critical, styles.letters, styles.bold]}>E</Text>
            </View>
            <Text style={[styles.letters, styles.bold]}>TILT = 1 point</Text>
            <Text style={[styles.letters, styles.bold]}>CLEAT = 5 points</Text>
            <Text style={[styles.letters, styles.bold]}>ATHLETE = 7 points</Text>
            <Text style={[styles.letters, styles.bold]}>ATHLETIC = 15 points</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start'
  },
  block: {
    width: 'auto',
    maxWidth: '90%',
    marginHorizontal: 'auto',
    height: 'auto',
  },
  bullet: {
    lineHeight: 30,
    alignItems: 'flex-start',
    marginVertical: 4,
    textAlign: 'left',
  },
  title: {
    fontSize: 22,
    fontFamily: 'OxygenMono',
    marginTop: 12
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
    zIndex: -1,
  },
  text: {
    marginVertical: 'auto',
    maxWidth: '90%',
    fontSize: 16,
    lineHeight: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    justifyContent: 'flex-start',
  },
  letters: {
    fontSize: 16,
    borderWidth: 0,
  },
  critical: {
      backgroundColor: 'gold',
      borderRadius: 5,
  },
  bold: {
      fontWeight: '600',
      textAlign: 'center',
  },
  letterRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'center',
  },
  exampleBox: {
    marginHorizontal: 'auto',
    width: 'auto',
  }
});
