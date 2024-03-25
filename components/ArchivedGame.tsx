import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Game, useGameContext } from '@/app/GameContext';

interface ArchivedGameProps {
    game: {
        id: number;
        score: number;
        letters: string;
        criticalLetter: string;
        foundWords: string[];
        dateCreated: string;
      };
}

export const ArchivedGame: React.FC<ArchivedGameProps> = ({ game }) => {
    const { id, score, letters, criticalLetter, foundWords, dateCreated } = game;
    const {state} = useGameContext();
    console.log(score);
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{dateCreated}</Text>
            <View style={styles.row}>
                <Text style={styles.text}>{letters}</Text>
                <Text style={styles.critical}>{criticalLetter}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Words Found: {foundWords.length}</Text>
                <Text style={styles.text}>Score: {score}</Text>
            </View>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        width: 240,
        padding: 6,
    },
    date: {
        textAlign: 'right',
        fontSize: 12,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 16,
    },
    critical: {
        backgroundColor: 'yellow',
        fontSize: 16,
    },
  });