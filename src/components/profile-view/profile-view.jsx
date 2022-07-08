import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';
import { UserInfo } from './user-info';
import './profile-view.scss';

export function ProfileView(props) {
    const [user, setUser] = useState(props.user);
    const [movies, setMovies] = useState(props.movies);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const getUser = () => {
        axios.get(`https://yourmoviescollection.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(response.data);
                setUser(response.data);
                setFavoriteMovies(response.data.FavoriteMovies)
            })
            .catch(error => console.error(error))
    }
    useEffect(() => {
        getUser();
    }, [])

    const handleDelete = () => {
        axios.delete(`https://yourmoviescollection.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert(`The account ${user.Username} was successfully deleted.`)
                localStorage.clear();
                window.open('/register', '_self');
            }).
            catch(error => console.error(error))
    }

    return (
        <Container id="profile-form">
            <Row className='user'>
                <Col className='user-info' xs={12} md={6}>
                    <UserInfo user={user} />
                </Col>
                <Col className='user-info' xs={12} md={6}>
                    <UpdateUser user={user} handleDelete={handleDelete} />
                </Col>
            </Row>

            <Row className="mt-5 ">
                <Col></Col>
                <Col>
                    <h2>Your favourite movies</h2>
                </Col>
                <Col></Col>
            </Row>
            <Row className="mt-3 user">
                <FavoriteMovies
                    movies={props.movies}
                    favoriteMovies={favoriteMovies}
                    currentUser={currentUser}
                    token={token} />
            </Row>


        </Container>
    )
}