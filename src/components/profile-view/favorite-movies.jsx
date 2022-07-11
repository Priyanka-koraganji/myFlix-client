import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Col } from 'react-bootstrap';

import './profile-view.scss';

export function FavoriteMovies(props) {
    const { movies, favoriteMovies, currentUser, token } = props;
    const favoriteMoviesList = [];

    favoriteMovies.forEach(id => {
        movies.map((movie) => {
            if (movie._id === id) {
                console.log(movie);
                favoriteMoviesList.push(movie);
            }
        })

    })

    const handleMovieDelete = (movieId) => {
        axios.delete(`https://yourmoviescollection.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert(`The movie was successfully deleted.`)
                window.open(`/users/${currentUser}`, '_self');
            }).
            catch(error => console.error(error))
    }

    return (
        <Fragment>
            {favoriteMoviesList.length === 0 ? (
                <p>You have no favourite movies yet.</p>
            ) : (
                favoriteMoviesList.map((movie) => {
                    return (
                        <Col xs={10} sm={8} md={6} lg={4} >
                            <Card className="movie-card">
                                <Link to={`/movies/${movie._id}`}>
                                    <Card.Img className='card-img' variant="top" src={movie.ImagePath} />
                                </Link>
                                <Card.Body className='body'>
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Card.Text>{movie.Description}</Card.Text>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Button className="button details-button" variant="outline-warning" size="sm">Open</Button>
                                    </Link>
                                    <Button
                                        className="button ml-2 details-button"
                                        variant="outline-warning"
                                        size="sm" onClick={() => { handleMovieDelete(movie._id) }} >
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
            )
            }
        </Fragment>
    )
}