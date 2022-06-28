import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './register-view.scss';

export function RegisterView(props) {

    const [username, enterUsername] = useState('');
    const [password, enterPassword] = useState('');
    const [email, enterEmail] = useState('');
    const [birthday, enterBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegistering(username);
    };

    return (
        <Container className='register-view'>
            <Row>
                <Col></Col>
                <Col md={8}>

                    <Form>
                        <h2>Welcome to Registration Page!</h2>
                        <Form.Group  className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type='text' value={username} onChange={(e) => enterUsername(e.target.value)} required placeholder='Enter a username' />
                        </Form.Group>
                        <Form.Group  className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type='password' value={password} onChange={(e) => enterPassword(e.target.value)} required minLength="8" placeholder='Enter Password' />
                        </Form.Group>
                        <Form.Group  className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type='email' value={email} onChange={(e) => enterEmail(e.target.value)} required placeholder='Enter Email' />
                        </Form.Group>
                        <Form.Group  className="mb-3">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control type='date' value={birthday} onChange={(e) => enterBirthday(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
                    </Form>

                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}
RegisterView.propTypes = {
    onRegistering: PropTypes.func.isRequired
};