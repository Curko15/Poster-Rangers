import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { GalleryData } from "../services/DataService";
import { BounceLoader } from "react-spinners";

import React, { useState } from "react";

import "../css/gallery.css";

const GalleryDisplay = () => {
  const { photos, isLoading } = GalleryData();

  const [model, setModel] = useState(false);
  const [tempimgSrc, setTempImgSrc] = useState("");

  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  return (
    <div>
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : photos.length === 0 ? (
        <div className="noPosters">
          <h1>Nema fotografija za prikazati!</h1>
        </div>
      ) : (
        <>
          <div className={model ? "model open" : "model"}>
            <img src={tempimgSrc} alt="\" />
            <IoMdClose onClick={() => setModel(false)} />
          </div>
          <div className="gallery">
            {photos.map((item, index) => {
              return (
                <div className="pics" key={index}>
                  <img
                    className="photos"
                    src={`data:image/${item.imageType};base64,${item.imagebyte}`}
                    alt={`poster-${item.nazivFoto}`}
                    onClick={() =>
                      getImg(
                        `data:image/${item.imageType};base64,${item.imagebyte}`,
                      )
                    }
                  />
                  <span className="download">
                    <a
                      href={`data:image/${item.imageType};base64,${item.imagebyte}`}
                      download={`image_${index}`}
                      className="down"
                    >
                      <FiDownload className="downloadIcon" />
                    </a>
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default GalleryDisplay;
