import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Link } from "react-router-dom";
import { Button, Figure, Card } from 'react-bootstrap';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }
    render() {
        const { movie, onBackClick } = this.props;

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
                                <span className="value">{movie.Genre.Name}</span>
                            </Link>
                        </div>
                        <div className="movie-director">
                            <span className="label"><strong>Director:</strong></span>
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <span className="value">{movie.Director.Name}</span>
                            </Link>
                        </div>
                        <div className="movie-description">
                            <span className="label"><strong>Description:</strong> </span>
                            <span className="value description">{movie.Description}</span>
                        </div>
                        <Button className="back-button" variant="secondary" onClick={() => { onBackClick(); }}>Back</Button>
                    </div>
                    <div className="movie-poster">
                        <Card>
                            <Card.Img className="poster" src={movie.ImagePath} />
                        </Card>
                    </div>
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