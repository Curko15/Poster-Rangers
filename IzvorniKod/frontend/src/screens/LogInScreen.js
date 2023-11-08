import React, { useState } from 'react';
import '../css/login.css';

const LogInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login clicked with:', { username, password });
    };

    return (
        <div className="center-container">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                    </label>
                    <br />
                    {/* Move the button to the right */}
                    <div className="button-container">
                        <button type="submit" className="submit-button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogInScreen;
