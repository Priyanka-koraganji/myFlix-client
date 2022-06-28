import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './main-view.scss';

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
            <Row className="main-view justify-content-md-center">
                {selectedMovie
                    ? (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    )
                    : movies.map(movie => (
                        <Col md={4}>
                            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    ))
                }
            </Row>
        );
    }
}
export default MainView;