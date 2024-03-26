import { View,Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export const ArchivedHeader = () => {
    const state = useSelector((state: RootState) => state.game);
  
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{state.games.length} Games</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
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
  });
  