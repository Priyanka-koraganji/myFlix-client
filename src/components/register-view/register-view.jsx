import React, { useState } from 'react';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './register-view.scss';
import axios from 'axios';

export function RegisterView() {

    const [username, enterUsername] = useState('');
    const [password, enterPassword] = useState('');
    const [email, enterEmail] = useState('');
    const [birthday, enterBirthday] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');



    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPassword('Password must be 6 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Email is required');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('invalid Email');
            isReq = false;
        }
        if (!birthday) {
            setBirthdayErr('Enter Birthday');
            isReq = false;
        }
        return isReq;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            /* Send request to the server for authentication */
            axios.post('https://yourmoviescollection.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful');
                    window.open('/', '_self')
                })
                .catch(e => {
                    console.log('error:' + e);
                    console.log('no such user');
                    alert('unable to register');
                });
        }
    };

    return (
        <Container className='register-view'>
            <Row>
                <Col></Col>
                <Col md={8}>

                    <Form>
                        <h2>Register for myFlix</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type='text' value={username} onChange={(e) => enterUsername(e.target.value)} required placeholder='Enter a username' />
                            {usernameErr && <p>{usernameErr}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type='password' value={password} onChange={(e) => enterPassword(e.target.value)} required minLength="8" placeholder='Enter Password' />
                            {passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type='email' value={email} onChange={(e) => enterEmail(e.target.value)} required placeholder='Enter Email' />
                            {emailErr && <p>{emailErr}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control type='date' value={birthday} onChange={(e) => enterBirthday(e.target.value)} />
                            {birthdayErr && <p>{birthdayErr}</p>}
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
                    </Form>

                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}
