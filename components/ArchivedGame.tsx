import { Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { RootState } from '@/app/store';
import {  useSelector } from 'react-redux';
import { useState } from 'react';


interface ArchivedGameProps {
    game: {
        id: number;
        score: number;
        letters: string;
        criticalLetter: string;
        foundWords: string[];
        dateCreated: string;
      };
    onPress: any
}

export const ArchivedGame: React.FC<ArchivedGameProps> = ({ game, onPress }) => {
    const { id, score, letters, criticalLetter, foundWords=[], dateCreated } = game;
    const [modalVisible, setModalVisibile] = useState(false);
    const state = useSelector((state: RootState) => state.game);
    
    const handlePress = (gameId: number) => {
        onPress(gameId);
    }
    return (
        <View style={[styles.container, { pointerEvents: modalVisible ? 'none' : 'auto' }]}>
            <View style={styles.topLine}>
                <Pressable onPress={()=>handlePress(game.id)}>
                    <FontAwesome name="trash" size={20} style={{marginLeft: 18}} />
                </Pressable>
                <Text style={styles.date}>{dateCreated}</Text>
            </View>
            <View style={styles.letterRow}>
                <Text style={[styles.text, styles.bold]}>{letters}</Text>
                <Text style={[styles.critical, styles.text, styles.bold]}>{criticalLetter}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Words: {foundWords.length}</Text>
                <Text style={styles.text}>Score: {score}</Text>
            </View>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 240,
        padding: 6,
    },
    date: {
        textAlign: 'right',
        fontSize: 12,
    },
    topLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    letterRow: {
        display: 'flex',
        flexDirection: 'row',
        padding: 4,
        justifyContent: 'center',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 18,
    },
    critical: {
        backgroundColor: 'gold',
        borderRadius: 5,
    },
    bold: {
        fontWeight: '600',
    },
    
  });