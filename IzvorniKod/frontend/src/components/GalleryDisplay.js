import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import { useState } from "react";

import "../css/gallery.css";

const GalleryDisplay = () => {
  let data = [];

  const [model, setModel] = useState(false);
  const [tempimgSrc, setTempImgSrc] = useState("");

  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  return (
    <>
      <div className={model ? "model open" : "model"}>
        <img src={tempimgSrc} alt="\" />
        <IoMdClose onClick={() => setModel(false)} />
      </div>
      <div className="gallery">
        {data.map((item, index) => {
          return (
            <div className="pics" key={index}>
              <img
                className="photos"
                src={item.imgSrc}
                alt=""
                onClick={() => getImg(item.imgSrc)}
              />
              <span className="download">
                <a
                  href={item.imgSrc}
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
  );
};
export default GalleryDisplay;
