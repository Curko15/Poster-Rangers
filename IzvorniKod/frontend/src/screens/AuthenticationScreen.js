import React from "react";
import Header from ".././components/Header.js";
import "../css/main.css";
import AuthenticationComponent from "../components/AuthenticationComponent";

const AuthenticationScreen = ({ viewType }) => {
    return (
        <div>
            <Header viewType="login" />
            <AuthenticationComponent viewType={viewType} />
        </div>
    );
};

export default AuthenticationScreen;
