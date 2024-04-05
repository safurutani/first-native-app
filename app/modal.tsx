import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Rules</Text>
      <View style={styles.block}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <View>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Words must include the center, critical letter</Text>
          </FontAwesome>          
        </View>
        <View >
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Words must be at least 4 letters long</Text>
          </FontAwesome>
        </View>
        <View >
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Letters can be used more than once</Text>
          </FontAwesome>
        </View>
        <View>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Words must be in the english dictionary</Text>
          </FontAwesome>   
        </View>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Scoring</Text>
      <View style={styles.block}>
        <View>
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  4 letter words are worth 1 point</Text>
          </FontAwesome>
        </View>
        <View >
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Words longer than 4 letters are 1 point per letter</Text>
          </FontAwesome>   
        </View>
        <View >
          <FontAwesome name="circle" size={8} style={styles.bullet}>
            <Text style={styles.text}>  Words using all 7 letters gain a bonus 7 points</Text>
          </FontAwesome>          
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
    width: '90%',
  },
  bullet: {
    lineHeight: 30,
    alignItems: 'flex-start',
    marginVertical: 4
  },
  title: {
    fontSize: 22,
    fontFamily: 'OxygenMono',
    marginTop: 12
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: '80%',
  },
  text: {
    marginVertical: 'auto',
    maxWidth: '90%',
    fontSize: 17,
    lineHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
