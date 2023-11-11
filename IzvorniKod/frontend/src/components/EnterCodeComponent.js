import React, { useState } from "react";
import "../css/enterCode.css";

const EnterCodeScreen = () => {
    const [userCode, setUserCode] = useState("");

    const handleCodeChange = (event) => {
        setUserCode(event.target.value);
    };

    const handleSubmit = () => {
        console.log("Entered code:", userCode);
    };

    return (
        <div className="codeCard">
            <h1>Welcome!</h1>
            <div className="inputForm">
                <span className="spanCard">Enter Your Code:</span>
                <input
                    className="codeInput"
                    type="text"
                    value={userCode}
                    onChange={handleCodeChange}
                    placeholder="Insert 6 digit code here"
                />
                <button
                    className="submitButton"
                    onClick={handleSubmit}
                    disabled={userCode.length !== 6}
                >
                    Go
                </button>
            </div>
            <p className="codeInfo">Check src/App.js file for routing info.</p>
        </div>
    );
};

export default EnterCodeScreen;
