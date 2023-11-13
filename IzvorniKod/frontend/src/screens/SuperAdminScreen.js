import React from "react";
import Header from ".././components/Header.js";
import Footer from "../components/Footer";
import "../css/main.css";
import AddAdmin from "../components/AddAdmin.js"; 
import AddConference from "../components/AddConference.js";

const SuperAdminScreen = () => {
    return (
        <div>
        <Header />
        <h1>Dobrodošao superadministratore!</h1>
        <AddAdmin />
        <AddConference />
        <Footer/>
        </div>
    );
};

export default SuperAdminScreen;
