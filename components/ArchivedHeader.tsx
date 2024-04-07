import { View,Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export const ArchivedHeader = () => {
    const state = useSelector((state: RootState) => state.game);
    var singular = "Game";
    if (state.games.length > 1 || state.games.length == 0) {
      singular = "Games";
    }

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Archived Games</Text>
        <Text style={{fontFamily: 'OxygenMono', ...styles.numGames}}>{state.games?.length} {singular}</Text>
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
      color: '#333',
      fontFamily: 'OxygenMono'
    },
    numGames: {
        fontSize: 14,
        color:'#333',
    }
  });
  