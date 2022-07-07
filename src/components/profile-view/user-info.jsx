import React from 'react';
import { Form,Button, Col, Container, Row } from 'react-bootstrap';

export function UserInfo({user}) {
    return (
        <>
            <h2>Your Info</h2>
            <Form>
                <Row>
                    <Col className="label">Username:</Col>
                    <Col className="value">{user.Username}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Password:</Col>
                    <Col className="value">******</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Email:</Col>
                    <Col className="value">{user.Email}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Birthday:</Col>
                    <Col className="value">{user.Birthday}</Col>
                </Row>
                </Form>
        </>
    )
}