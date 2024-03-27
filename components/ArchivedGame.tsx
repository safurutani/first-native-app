import { Modal, Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { REMOVE_GAME } from '@/app/reducers';


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
    const [modalVisible, setModalVisibile] = useState(false);
    const state = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            {modalVisible && <View
                style={styles.modal}
            >
                <Text style={{textAlign: 'center'}}>Are you sure you want to delete this game?</Text>
                <View style={styles.row}>
                    <Pressable style={styles.button} onPress={()=>{
                        dispatch({type: REMOVE_GAME, payload: id });
                    }}>Yes</Pressable>
                    <Pressable style={styles.button} onPress={() => {setModalVisibile(!modalVisible)}}>No</Pressable>
                </View>
            </View>}
            <View style={styles.topLine}>
                <Pressable onPress={()=> {
                    setModalVisibile(!modalVisible);                   
                }}>
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
    button: {
        borderWidth: 1,
        borderColor: 'darkred',
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginTop: 8,
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
    modal: {
        display: 'flex',
        height: 120,
        width: 240,
        position: 'absolute',
        marginVertical: 'auto',
        backgroundColor: 'white',
        zIndex: 2,
        borderColor: 'darkred',
        borderWidth: 2,
        borderRadius: 5,
        padding: 6
    }
  });