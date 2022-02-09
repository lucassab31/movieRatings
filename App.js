import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, StatusBar, FlatList, ScrollView } from 'react-native';
import {
    NavigationContainer,
    useFocusEffect,
    useNavigation,
    useRoute,
  } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {

    const addMovie = (movie) => {
        setMovieList([...movieList, {
            id: movieList.length,
            movie: {
                title: movie.title,
                note: note,
                desc: desc
            }
        }])
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="Home"
                component={MovieList}
                initialParams={{ addMovie: null }}
                />
                <Stack.Screen name="Add" component={AddMovie} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const MovieList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [movieList, setMovieList] = useState([]);

    const addMovie = (movie) => {
        setMovieList((current) => [...current, { id: current.length, movie: movie }]);
    };
    
    useFocusEffect(() => {
        if (!route.params.addMovie) return;
        addMovie(route.params.addMovie);
        route.params.addMovie = null;
    });

    return (
        <View>
            <Text>Movies List</Text>
            <Button
                title="Ajouter un film"
                onPress={() => {
                    navigation.navigate("Add");
                }}
            />
            <FlatList
                data={movieList}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <Movie title={item.movie.title} note={item.movie.note} desc={item.movie.desc}></Movie>}
            ></FlatList>
        </View>
    );
}

const Movie = ({title, note, desc}) => {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{note}/5</Text>
            <Text>{desc}</Text>
        </View>
    );
}

const AddMovie = () => {
    const navigation = useNavigation();

    const [valid, setValid] = useState(false);
    const [img, setImg] = useState("");
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(() => {
        if (title.length >= 2 && +note && note.length == 1 && desc.length >= 10)
            setValid(true);
    }, [title, note, desc]);

    const checkNote = (text) => {
        if ((+text || text == "") && (parseInt(text) <= 5 || text.length == 0))
            setNote(text);
    }

    return (
        <View>
            <Text>Movie Rating</Text>
            <View>
                <TextInput value={title} onChangeText={setTitle} placeholder='Titre du film'></TextInput>
                <TextInput value={note} onChangeText={checkNote} keyboardType='numeric' placeholder='Note /5'></TextInput>
                <TextInput value={desc} onChangeText={setDesc} placeholder='Description'></TextInput>
                <Button title='Ajouter' disabled={!valid} onPress={() => {
                    navigation.navigate("Home", { addMovie: {title: title, note: note, desc: desc} })
                }}></Button>
            </View>
            <StatusBar style='auto'></StatusBar>
        </View>
    );
}

export default App;