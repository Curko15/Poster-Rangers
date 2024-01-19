import React from "react";
import Header from ".././components/Header.js";
import AddGalleryPhotos from "../components/AddGalleryPhotos";

import "../css/main.css";

const AddGalleryPhotosScreen = () => {
  return (
    <div>
      <Header viewType="admin" />
      <div className="title">
        <h1>Dodavanje slika s konferencije</h1>
      </div>
      <AddGalleryPhotos />
    </div>
  );
};

export default AddGalleryPhotosScreen;
