import React from "react";
import{ useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { BounceLoader } from "react-spinners";
import { PosterData } from "../services/DataService";
import { PromoData } from "../services/DataService";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../css/imageSlider.css";

const ImageSlider = ({ view }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  let isLoading, posters;

  if (view === "poster") {
    ({ posters, isLoading } = PosterData());
  } else {
    ({ promo: posters, isLoading } = PromoData());
  }

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          start
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          initialSlide={Math.floor(posters.length / 2)}
        >
          {posters.map((poster, index) => {
            const type =
              view === "poster" ? poster.imageType : poster.promoType;
            const byte =
              view === "poster" ? poster.imagebyte : poster.promobyte;
            return (
              <SwiperSlide
                style={{
                  marginRight: "15px",
                  zIndex: currentSlide === index ? 1 : 0,
                  transform: `scale(${currentSlide === index ? 1.2 : 1})`
                }}
                key={poster.posterId}
              >
                <img
                  src={`data:image/${type};base64,${byte}`}
                  alt={`poster-${index}`}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default ImageSlider;
