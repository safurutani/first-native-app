import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { Text, View } from './Themed';

interface LetterTileProps {
    letter: string;
    critical?: boolean;
  }

export function LetterTile({ letter, critical }: LetterTileProps) {
    const [isPressed, setIsPressed] = useState(false);
    const containerStyle = [
        Platform.OS === 'android' && styles.androidTextContainer,
    ]
      const textStyle = [
        styles.text,
        Platform.OS === 'android' && styles.androidText,
        critical ? styles.criticalText : styles.normalText,
      ];
    return (
        <View>
            <Pressable 
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={({ pressed }) => [
            styles.container,
            critical && styles.critical,
            {
                opacity: pressed ? 0.5 : 1,
            },
            ]}>
                {Platform.OS === 'android' ? (
                    <View style={containerStyle}>
                        <Text style={textStyle}>{letter}</Text>
                    </View>
                ) : (
                    <Text style={textStyle}>{letter}</Text>
                )}
            </Pressable>
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
    androidTextContainer: {
        position: 'absolute',
    },
    text: {
        fontSize: 24,
        color: 'black',
        backgroundColor: 'transparent',
        marginTop: 50,
        lineHeight: 24
    },
    critical: {
        borderBottomColor: 'orange',
    },
    normalText: {
        backgroundColor: 'gold',
    },
    criticalText: {
        backgroundColor: 'orange',
    },
      androidText: {
        // Android-specific text styles
        fontSize: 24, // Adjust as needed
        color: 'black',
        backgroundColor: 'gold',
        marginTop: 0,
      },
});
