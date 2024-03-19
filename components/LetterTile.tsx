import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';

interface LetterTileProps {
    letter: string;
    critical?: boolean;
  }

export function LetterTile({ letter, critical }: LetterTileProps) {
    return (
        <View>
            <TouchableOpacity style={[styles.container, critical && styles.critical]}>
                <Text style={styles.text}>{letter}</Text>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 0,
        borderLeftWidth: 25,
        borderLeftColor: 'transparent',
        borderRightWidth: 25,
        borderRightColor: 'transparent',
        borderBottomWidth: 46,
        borderBottomColor: 'gold',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    text: {
        fontSize: 24,
        color: 'black',
        marginTop: 50
    },
    critical: {
        borderBottomColor: 'orange',
    }
});
