import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';

const Stack = createNativeStackNavigator();

const App = () => {

    const addMovie = (movie) => {
        setMovieList([...movieList, {
            id: movieList.length,
            movie: {
                img: movie.img,
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
                    options={{ title: "Liste des films" }}
                    component={MovieList}
                    initialParams={{ addMovie: null }}
                />
                <Stack.Screen 
                    name="Add"
                    options={{ title: "Ajouter un film" }}
                    component={AddMovie} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;