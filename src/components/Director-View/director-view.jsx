import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './director-view.scss';

export const DirectorView = (props) => {
    return (
        <>
            <Card className='director-view'>

                <Card.Body className='card-body'>
                    <Card.Title>{props.director.Name}</Card.Title>
                    <Card.Text>{props.director.Bio}</Card.Text>
                    <button onClick={() => { props.onBackClick(); }}>Back</button>
                </Card.Body>
            </Card>
        </>
    )
}