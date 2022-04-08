import { useState } from 'react';
import { StyleSheet, Button, Text, TextInput, View, StatusBar, FlatList, Image } from 'react-native';
import {
    useFocusEffect,
    useNavigation,
    useRoute,
} from "@react-navigation/native";

const MovieList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [movieList, setMovieList] = useState([
        {
            id: 1,
            movie: {
                img: "https://www.jeuxvideo-live.com/news-img/fi-uygzucamcxh0-1642152287.jpg",
                title: "Uncharted",
                note: "4",
                desc: "Le jeune et intrépide Nathan Drake réalise sa première chasse au trésor aux côtés de son partenaire Victor 'Sully' Sullivan"
            }
        },
        {
            id: 2,
            movie: {
                img: "https://www.jeuxvideo-live.com/news-img/fi-uygzucamcxh0-1642152287.jpg",
                title: "Now You See Me",
                note: "5",
                desc: "Les Quatre Cavaliers, un groupe de brillants magiciens et illusionnistes, vient de donner deux spectacles de magie époustouflants"
            }
        },
        {
            id: 3,
            movie: {
                img: "https://www.jeuxvideo-live.com/news-img/fi-uygzucamcxh0-1642152287.jpg",
                title: "Avenger End Game",
                note: "5",
                desc: "Le Titan Thanos, ayant réussi à s'approprier les six Pierres d'Infinité et à les réunir sur le Gantelet doré, a pu réaliser son objectif de pulvériser la moitié de la population de l'Univers"
            }
        },
        {
            id: 4,
            movie: {
                img: "https://www.jeuxvideo-live.com/news-img/fi-uygzucamcxh0-1642152287.jpg",
                title: "The Lucky One",
                note: "4",
                desc: "Le sergent Logan Thibault du corps des Marines rentre chez lui après sa troisième période de services en Irak"
            }
        },
    ]);
    const [search, setSearch] = useState("");

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
            <TextInput style={styles.input} value={search} onChangeText={setSearch} placeholder='Rechercher un titre'></TextInput>
            <Button
                title="Rechercher"
                onPress={() => {
                    navigation.navigate("Add");
                }}
            />
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
                renderItem={({ item }) => <Movie img={item.movie.img} title={item.movie.title} note={item.movie.note} desc={item.movie.desc}></Movie>}
                ListFooterComponent={<View style={{ height: 150 }}></View>}
            ></FlatList>
        </View>
    );
}

const Movie = ({ img, title, note, desc }) => {
    return (
        <View style={styles.movie}>
            <Image style={{height: 200, width: 150}} source={{uri: img}}/>
            <Text style={{fontWeight: 'bold', fontSize: 25, color: '#fff' }}>{title}</Text>
            <Text style={{fontSize: 15, color: '#fff' }}>{note}/5</Text>
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
        alignItems: 'center',
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

export default MovieList;