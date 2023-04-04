import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className='movie-card'>

                <Card.Img variant="top" className='card-img hoverable' src={movie.ImagePath} />
                <Card.Body className='moviecard-body'>
                    <Card.Title style={{ fontSize: '1em' }}>{movie.Title}</Card.Title>
                    {/* <Card.Text>{movie.Description}</Card.Text> */}
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="danger link details-button">Details</Button>
                    </Link>

                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        })
    }).isRequired
};