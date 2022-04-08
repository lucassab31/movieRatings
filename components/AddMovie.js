import { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, TextInput, View, StatusBar, } from 'react-native';
import {
    useNavigation,
} from "@react-navigation/native";

const AddMovie = () => {
    const navigation = useNavigation();

    const [valid, setValid] = useState(false);
    const [img, setImg] = useState("");
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(() => {
        if (img.length > 5 && title.length >= 2 && +note && note.length == 1 && desc.length >= 10)
            setValid(true);
    }, [img, title, note, desc]);

    const checkNote = (text) => {
        if ((+text || text == "") && (parseInt(text) <= 5 || text.length == 0))
            setNote(text);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter un film</Text>
            <View>
                <TextInput style={styles.input} value={img} onChangeText={setImg} placeholder="Url de l'image du film"></TextInput>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder='Titre du film'></TextInput>
                <TextInput style={styles.input} value={note} onChangeText={checkNote} keyboardType='numeric' placeholder='Note /5'></TextInput>
                <TextInput style={styles.input} value={desc} onChangeText={setDesc} placeholder='Description'></TextInput>
                <Button title='Ajouter' disabled={!valid} onPress={() => {
                    navigation.navigate("Home", { addMovie: { img: img, title: title, note: note, desc: desc } })
                }}></Button>
            </View>
            <StatusBar style='auto'></StatusBar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#ff9000'
    },
    flatList: {
        marginVertical: 10
    },
    movie: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#ff9000',
    },
    input: {
        fontSize: 20,
        color: '#000',
        marginVertical: 10,
        borderColor: '#ff9000',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    }
});

export default AddMovie;