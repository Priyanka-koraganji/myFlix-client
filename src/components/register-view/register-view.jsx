import React, { useState } from 'react';
import PropTypes from 'prop-types';


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
        <form>
            <div>
                <label>Username:</label>
                <input type='text' value={username} onChange={(e) => enterUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type='password' value={password} onChange={(e) => enterPassword(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type='email' value={email} onChange={(e) => enterEmail(e.target.value)} />
            </div>
            <div>
                <label>Birthday:</label>
                <input type='date' value={birthday} onChange={(e) => enterBirthday(e.target.value)} />
            </div>
            <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
    )
}
RegisterView.propTypes = {
    onRegistering: PropTypes.func.isRequired
};