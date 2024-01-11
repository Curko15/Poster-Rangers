import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../css/imageSlider.css";
import { BounceLoader } from "react-spinners";
import { PosterData } from "../services/DataService";
import { PromoData } from "../services/DataService";

const ImageSlider = ({ view }) => {
  let isLoading;
  let posters;

  if (view === "poster") {
    ({ posters, isLoading } = PosterData());
  } else {
    ({ promo: posters, isLoading } = PromoData());
  }
  console.log(posters);
  return (
    <>
      {isLoading ? (
        <div className="loader">
          <BounceLoader color="#d63636" />
        </div>
      ) : (
        <Swiper
          effect={"cube"}
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
        >
          {posters.map((poster, index) => {
            const type =
              view === "poster" ? poster.imageType : poster.promoType;
            const byte =
              view === "poster" ? poster.imagebyte : poster.promobyte;
            return (
              <SwiperSlide
                style={{ marginRight: "15px" }}
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
