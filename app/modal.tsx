import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Rules</Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text style={styles.text}>
        {'\u2022'} Words must include the center, critical letter{'\n'}
        {'\u2022'} Words must be at least 4 letters long{'\n'}
        {'\u2022'} Letters can be used more than once{'\n'}
        {'\u2022'} Words must be in the english dictionary
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Scoring</Text>
      <Text style={styles.text}>
        {'\u2022'} 4 letter words are worth 1 point{'\n'}
        {'\u2022'} Words longer than 4 letters are worth however many letters they are{'\n'}
        {'\u2022'} Words using all 7 letters gain a bonus 7 points
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'OxygenMono',
    marginTop: 12
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: '80%',
  },
  text: {
    marginVertical: 12,
    maxWidth: 300
  }
});
