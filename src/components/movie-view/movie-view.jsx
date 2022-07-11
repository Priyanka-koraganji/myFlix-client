import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from 'axios';

export class MovieView extends React.Component {
    constructor() {
        super()
        this.state = {
            userData: ''
        }
    }
    keypressCallback(event) {
        console.log(event.key);
    }
    FavMovie = () => {
        const token = localStorage.getItem('token');
        const { user, movie } = this.props;
        //let movieid = userData.FavoriteMovies.find(id => id === movie._id);
        // if (!movieid) {
        axios.post(`https://yourmoviescollection.herokuapp.com/users/${user}/movies/${movie._id}`, {},
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                console.log(res);
                window.open(`/users/${user}`, '_self');
            })
            .catch(err => {
                console.log(err);
            })
        // }
    }
    componentDidMount() {
        console.log('did mount');
        document.addEventListener('keypress', this.keypressCallback);
        const token = localStorage.getItem('token');
        const { user } = this.props;
        axios.get(`https://yourmoviescollection.herokuapp.com/users/${user}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    userData: res.data
                })

            })
            .catch(err => {
                console.log(err);
            })

    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }
    render() {
        const { movie, onBackClick, user } = this.props;
        const userData = this.state.userData;
        console.log(userData);
        //let movieid = userData.FavoriteMovies.find(id => id === movie._id);
        return (
            <>
                <div className="movie-view">
                    <div className='movie-body'>
                        <div className="movie-title">
                            <h2 className="value">{movie.Title}</h2>
                        </div>
                        <div className="movie-genre">
                            <span className="label"><strong>Genre:</strong></span>
                            <Link to={`/genre/${movie.Genre.Name}`}>
                                <span className="value genre-link">{movie.Genre.Name}</span>
                            </Link>
                        </div>
                        <div className="movie-director">
                            <span className="label"><strong>Director:</strong></span>
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <span className="value director-link" >{movie.Director.Name}</span>
                            </Link>
                        </div>
                        <div className="movie-description">
                            <span className="label"><strong>Description:</strong> </span>
                            <span className="value description">{movie.Description}</span>
                        </div>
                        <div className='buttons'>
                            <Button className="back-button" variant="danger" onClick={() => { onBackClick(); }}>Back</Button>
                            {userData ?
                                (userData.FavoriteMovies.find(id => id === movie._id)) ?
                                    '' :
                                    <Button className="Fav-button" variant="danger" onClick={this.FavMovie}>Add to Favorites</Button> : ''
                            }



                        </div>
                    </div>
                    <img className="movie-poster" src={movie.ImagePath} />

                </div>



            </>
        );
    }
}
MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired
        })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};