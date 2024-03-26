import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

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
    const { id, score, letters, criticalLetter, foundWords=[], dateCreated } = game;
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{dateCreated}</Text>
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
    letterRow: {
        display: 'flex',
        flexDirection: 'row',
        padding: 4,
        justifyContent: 'center',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
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
    }
  });