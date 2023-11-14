import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "../css/imageSlider.css";
import { getConferenceId } from "../services/AuthService";

const ImageSlider = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const conferenceId = getConferenceId();
    const fetchPosters = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/konferencija/getKonfId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: conferenceId,
            }),
          },
        );

        if (response.ok) {
          const conferenceData = await response.json();
          const posterResponse = await fetch(
            `http://localhost:8081/poster/getAll/${conferenceData}`,
            {
              method: "GET",
            },
          );

          if (posterResponse.ok) {
            const posterData = await posterResponse.json();
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
          <SwiperSlide key={index}>
            <img src={poster.posterPath} alt={`poster-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
