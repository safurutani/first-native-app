import { View,Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export const ArchivedHeader = () => {
    const state = useSelector((state: RootState) => state.game);
  
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Archived Games</Text>
        <Text style={styles.numGames}>{state.games.length} Games</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 8,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    numGames: {
        fontSize: 14,
        color:'#333',
    }
  });
  