import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { getConferenceId } from "../services/AuthService";
import axios from "axios";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../css/imageSlider.css";

const ImageSlider = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const conferenceId = getConferenceId();
    const fetchPosters = async () => {
      try {
        const response = await axios.post(
          "/api/konferencija/getKonfId",
          {
            password: conferenceId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 200) {
          const conferenceData = response.data;
          const posterResponse = await axios.get(
            `/api/poster/getAll/${conferenceData}`,
          );

          if (posterResponse.status === 200) {
            const posterData = posterResponse.data;
            setPosters(posterData);
          } else {
            console.error("Error fetching posters:", posterResponse.statusText);
          }
        } else {
          console.error("Error fetching conference data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPosters();
  }, []);

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
              src={"api/images/" + poster.posterPath}
              alt={`poster-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
