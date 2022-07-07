import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';
//import all the components
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { Row, Col, Navbar } from 'react-bootstrap';
import { Navbar } from '../navbar/navbar';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../Director-View/director-view';
import { ProfileView } from '../profile-view/profile-view';
//import { MovieCard } from '../movie-card/movie-card';


class MainView extends React.Component {
    constructor() {
        super();
        // this.state = {
        //     user: null
        // };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            // this.setState({
            //     user: localStorage.getItem('user')
            // });
            this.props.setUser(localStorage.getItem('user'));
            this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        // this.setState({
        //     user: authData.user.Username
        // });
        this.props.setUser(authData.user.Username);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }
    getMovies(token) {
        axios.get('https://yourmoviescollection.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                // this.setState({
                //     movies: response.data
                // });
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let { movies, user } = this.props;
        return (
            <Router>
                <Navbar user={user} />

                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        // return movies.map(m => (
                        //     <Col md={3} key={m._id}>
                        //         <MovieCard movie={m} />
                        //     </Col>
                        //))
                        return <MoviesList movies={movies} />;
                    }} />
                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegisterView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }
                    } />

                    <Route path="/genre/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }
                    } />
                    <Route path={`/users/${user}`} render={({ history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <Col>
                            <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path={`/user-update/${user}`} render={({ history }) => {
                        if (!user) return <Redirect to='/' />
                        return <Col>
                            <UserUpdate user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>

            </Router>

        );
    }
}
let mapStateToProps = state => {
    return { movies: state.movies, user: state.user }
}
export default connect(mapStateToProps, { setMovies, setUser })(MainView);