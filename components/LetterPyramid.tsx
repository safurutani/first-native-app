import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { LetterTile } from './LetterTile';

interface LetterPyramidProps {
    letter: string;
    letters: string;
    critical?: boolean;
    handleLetterPress: (letter: string) => any;
  }

export function LetterPyramid({ letters='', handleLetterPress}: LetterPyramidProps) {
    if (typeof letters !== 'string') {
            return null;
    }
    const letterArray = letters.split('');
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <LetterTile letter={letterArray[0]} onPress={() => handleLetterPress(letterArray[0])}/>
                <LetterTile letter={letterArray[1]} onPress={() => handleLetterPress(letterArray[1])}/>
            </View>
            <View style={styles.middleRow}>
                <LetterTile letter={letterArray[2]} onPress={() => handleLetterPress(letterArray[2])} />
                <LetterTile letter={letterArray[6]} onPress={() => handleLetterPress(letterArray[6])} critical/>
                <LetterTile letter={letterArray[3]} onPress={() => handleLetterPress(letterArray[3])} />
                
            </View>
            <View style={styles.row}>
                
                <LetterTile letter={letterArray[4]} onPress={() => handleLetterPress(letterArray[4])}/>
                <LetterTile letter={letterArray[5]} onPress={() => handleLetterPress(letterArray[5])}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    row: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'center',
        marginHorizontal: 36,
        backgroundColor:'transparent',
    },
    middleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor:'transparent',
    },

});