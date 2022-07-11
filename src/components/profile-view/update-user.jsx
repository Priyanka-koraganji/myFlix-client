import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './profile-view.scss';

export function UpdateUser(props) {
    const { user, handleDelete } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [values, setValues] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
    });

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setValues({ ...values, usernameErr: 'Username required' });
            isReq = false;
        } else if (username.length < 2) {
            setValues({ ...values, usernameErr: 'Username must be at least 2 characters long' });
            isReq = false;
        }
        if (!password) {
            setValues({ ...values, passwordErr: 'Password required' });
            isReq = false;
        } else if (password.length < 6) {
            setValues({ ...values, passwordErr: 'Password must be at least 6 characters long' });
            isReq = false;
        }
        if (!email) {
            setValues({ ...values, emailErr: 'Email required' });
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({ ...values, emailErr: 'Enter valid email' });
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            const token = localStorage.getItem('token');
            axios.put(`https://yourmoviescollection.herokuapp.com/users/${user.Username}`, {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(response => {
                    console.log(response.data);
                    alert('Profile was successfully updated.');
                    window.open(`/users/${user.Username}`, '_self');
                })
                .catch(error => {
                    console.error(error);
                    alert('Unable to update profile.');
                });
        }
    };

    return (
        <>
            <h2>Edit profile</h2>
            <Row id="update-form">
                <Col sm="10" md="12" lg="12">
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={user.Username} required />
                            {values.usernameErr && <p>{values.usernameErr}</p>}
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='****' required />
                            {values.passwordErr && <p>{values.passwordErr}</p>}
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder={user.Email} required />
                            {values.emailErr && <p>{values.emailErr}</p>}
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder={user.Birthday} />
                        </Form.Group>
                        <Form.Group controlId="formBirthday" className="mt-3 edit">
                            <Button className="edit-button" variant="warning" type="submit" onClick={handleSubmit}>Edit Profile</Button>
                            <Button className="delete-button" variant="danger" onClick={handleDelete}>Delete Profile</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </>
    )
}