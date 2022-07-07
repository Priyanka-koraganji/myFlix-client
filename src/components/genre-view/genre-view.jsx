import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './genre-view.scss';

export const GenreView = (props) => {
    return (
        <>
            <Card className='genre-view'>
                <Card.Body className='card-body'>
                    <Card.Title>{props.genre.Name}</Card.Title>
                    <Card.Text>{props.genre.Description}</Card.Text>
                    <Button variant="primary" onClick={() => { props.onBackClick(); }}>Back</Button>
                </Card.Body>
            </Card>
        </>
    )
}