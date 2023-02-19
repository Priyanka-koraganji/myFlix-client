import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Link } from "react-router-dom";
import { Button, Figure, Card, Image } from 'react-bootstrap';
import axios from 'axios';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }
    FavMovie = () => {
        const token = localStorage.getItem('token');
        const { user, movie } = this.props;
        console.log(movie._id);
        axios.post(`https://yourmoviescollection.herokuapp.com/users/${user}/movies/${movie._id}`, {},
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }
    render() {
        const { movie, onBackClick, user } = this.props;

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
                            <Button className="Fav-button" variant="danger" onClick={this.FavMovie}>Add to Favorites</Button>
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