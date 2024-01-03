/*import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";
import img7 from "../assets/images/img7.jpg";
import img8 from "../assets/images/img8.jpg";
import img9 from "../assets/images/img9.jpg";
import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import { useState } from "react";

import "../css/gallery.css";

const GalleryDisplay = () => {
  let data = [
    {
      id: 1,
      imgSrc: img1,
    },
    {
      id: 2,
      imgSrc: img2,
    },
    {
      id: 3,
      imgSrc: img3,
    },
    {
      id: 4,
      imgSrc: img4,
    },
    {
      id: 5,
      imgSrc: img5,
    },
    {
      id: 6,
      imgSrc: img6,
    },
    {
      id: 7,
      imgSrc: img7,
    },
    {
      id: 8,
      imgSrc: img8,
    },
    {
      id: 9,
      imgSrc: img9,
    },
  ];

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
export default GalleryDisplay;*/
