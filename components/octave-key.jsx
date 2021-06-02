import React, { useState, memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Notes } from "../constants";

function OctaveKey(props) {
    console.log("Rendering octave key")
    const [octave, setOctave] = useState(Notes.minOctave);

    const onOctaveControlPressed = async (increment) => {
        if (octave === Notes.minOctave && increment === -1)
            await setOctave(Notes.maxOctave);
        else if (octave === Notes.maxOctave && increment === 1)
            await setOctave(Notes.minOctave);
        else
            await setOctave(octave + increment);

        await props.onOctaveChanged(octave);
    };

    const toButton = (text, onPressed) => (
        <TouchableOpacity
            onPress={onPressed}
            style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
    
    return (
        <View style={styles.octaveKey}>
            {toButton("<", () => onOctaveControlPressed(-1))}
            <Text style={styles.text}>Octave {octave}</Text>
            {toButton(">", () => onOctaveControlPressed(1))}
        </View>);
}
export default React.memo(OctaveKey);

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primaryDark,
        flexGrow: 1,
        flex: 1
    },
    octaveKey: {
        flexDirection: "row",
        backgroundColor: Colors.primaryLight,
        flexGrow: 4,
        flex: 4
    },
    text: {
        flex: 3,
        color: "#fff",
        textAlign: "center",
        textAlignVertical: "center"
    }
});