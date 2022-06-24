import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import axios from 'axios';
class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: null
        };
    }
    componentDidMount() {
        axios.get('https://yourmoviescollection.herokuapp.com/movies')
            .then(response => {
                console.log(response);
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    onLoggedIn(user) {
        this.setState({
            user
        });
    }
    onRegistering(register) {
        this.setState({
            register
        });
    }
    render() {
        const { movies, selectedMovie, user, register } = this.state;

        if (!register) return <RegisterView onRegistering={(register) => this.onRegistering(register)} />
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    ))
                }
            </div>
        );
    }
}
export default MainView;