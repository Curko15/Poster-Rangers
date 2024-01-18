import React, { useState } from "react";
import { PosterData } from "../services/DataService";
import { BounceLoader } from "react-spinners";

import "../css/posterDisplay.css";
import { IoMdClose } from "react-icons/io";
import { FiDownload } from "react-icons/fi";

const PosterDisplay = () => {
  const { posters, isLoading } = PosterData();

  const [model, setModel] = useState(false);
  const [tempimgSrc, setTempImgSrc] = useState("");

  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  return (
    <div className="posterDisplay">
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : posters.length === 0 ? (
        <div className="noPosters">
          <h2>Nema postera za prikazati!</h2>
        </div>
      ) : (
        <>
          <div className={model ? "model open" : "model"}>
            <img src={tempimgSrc} alt="\" />
            <IoMdClose onClick={() => setModel(false)} />
          </div>
          <div className="postersContainer">
            {posters.map((poster, index) => (
              <div key={index} className="posterItem">
                <img
                  className="posterImage"
                  src={`data:image/${poster.imageType};base64,${poster.imagebyte}`}
                  alt={`poster-${index}`}
                  onClick={() =>
                    getImg(
                      `data:image/${poster.imageType};base64,${poster.imagebyte}`,
                    )
                  }
                />
                
                <div className="details">
                  <h3 className="title">Naziv: {poster.nazivPoster}</h3>
                  <h3 className="author">
                    Autor: {`${poster.imeAutor} ${poster.prezimeAutor}`}
                  </h3>
                  <h3 className="email">Email autora: {poster.emailAutor}</h3>
                <span className="download">
                  <a
                    href={`data:image/${poster.imageType};base64,${poster.imagebyte}`}
                    download={`image_${index}`}
                    className="down"
                  >
                    <FiDownload className="downloadIcon" />
                  </a>
                </span></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PosterDisplay;
