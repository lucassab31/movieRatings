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
    const [movieList, setMovieList] = useState([
        {
            id: 1,
            movie: {
                title: "Uncharted",
                note: "4",
                desc: "Le jeune et intrépide Nathan Drake réalise sa première chasse au trésor aux côtés de son partenaire Victor 'Sully' Sullivan"
            }
        },
        {
            id: 2,
            movie: {
                title: "Now You See Me",
                note: "5",
                desc: "Les Quatre Cavaliers, un groupe de brillants magiciens et illusionnistes, vient de donner deux spectacles de magie époustouflants"
            }
        },
        {
            id: 3,
            movie: {
                title: "Avenger End Game",
                note: "5",
                desc: "Le Titan Thanos, ayant réussi à s'approprier les six Pierres d'Infinité et à les réunir sur le Gantelet doré, a pu réaliser son objectif de pulvériser la moitié de la population de l'Univers"
            }
        },
        {
            id: 4,
            movie: {
                title: "The Lucky One",
                note: "4",
                desc: "Le sergent Logan Thibault du corps des Marines rentre chez lui après sa troisième période de services en Irak"
            }
        },
    ]);

    const addMovie = (movie) => {
        setMovieList((current) => [...current, { id: current.length, movie: movie }]);
    };

    useFocusEffect(() => {
        if (!route.params.addMovie) return;
        addMovie(route.params.addMovie);
        route.params.addMovie = null;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liste de Film</Text>
            <Button
                title="Ajouter un film"
                onPress={() => {
                    navigation.navigate("Add");
                }}
            />
            <FlatList
                style={styles.flatList}
                contentInset={{ right: 0, top: 0, left: 0, bottom: 0 }}
                data={movieList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Movie title={item.movie.title} note={item.movie.note} desc={item.movie.desc}></Movie>}
                ListFooterComponent={<View style={{ height: 100 }}></View>}
            ></FlatList>
        </View>
    );
}

const Movie = ({ title, note, desc }) => {
    return (
        <View style={styles.movie}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, color: '#fff' }}>{title}</Text>
            <Text style={{ textAlign: 'center', fontSize: 15, color: '#fff' }}>{note}/5</Text>
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
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter un film</Text>
            <View>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder='Titre du film'></TextInput>
                <TextInput style={styles.input} value={note} onChangeText={checkNote} keyboardType='numeric' placeholder='Note /5'></TextInput>
                <TextInput style={styles.input} value={desc} onChangeText={setDesc} placeholder='Description'></TextInput>
                <Button title='Ajouter' disabled={!valid} onPress={() => {
                    navigation.navigate("Home", { addMovie: { title: title, note: note, desc: desc } })
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

export default App;