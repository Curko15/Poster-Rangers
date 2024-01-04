import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import PosterData from "../services/PosterData";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../css/imageSlider.css";

const ImageSlider = () => {
  const posters = PosterData();

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
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
      >
        {posters.map((poster, index) => (
          <SwiperSlide key={poster.posterId}>
            <img
              src={`data:image/${poster.imageType};base64,${poster.imagebyte}`}
              alt={`poster-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
