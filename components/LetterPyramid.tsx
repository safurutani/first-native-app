import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { LetterTile } from './LetterTile';

export function LetterPyramid(props:{ letters: string }) {
    const letterArray = props.letters.split('');
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <LetterTile letter={letterArray[0]}/>
                <LetterTile letter={letterArray[1]}/>
            </View>
            <View style={styles.middleRow}>
                <LetterTile letter={letterArray[2]}/>
                <LetterTile letter={letterArray[6]} critical/>
                <LetterTile letter={letterArray[3]}/>
                
            </View>
            <View style={styles.row}>
                
                <LetterTile letter={letterArray[4]}/>
                <LetterTile letter={letterArray[5]}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'center',
        marginHorizontal: 36,
    },
    middleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10
    },

});
/*

 O   O
   O
O O O O

*/