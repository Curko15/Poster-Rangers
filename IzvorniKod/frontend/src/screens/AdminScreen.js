import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import "../css/main.css";
import AddConference from "../components/AddConference.js"; 

const AdminScreen = () => {
    return (
        <div>
        <Header />
        <h1>Dobrodošao administratore!</h1>
        <AddConference />
        <Footer/>
        </div>
    );
};

export default AdminScreen;
