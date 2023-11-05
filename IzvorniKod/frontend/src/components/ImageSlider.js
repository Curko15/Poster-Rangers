import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "../css/swiper.css";

const ImageSlider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([
      "https://fastly.picsum.photos/id/612/200/300.jpg?hmac=vJ35AV5-TQa5ET5az0aESTnI3zaFCjRYD9OnYaiYIYc",
      "https://fastly.picsum.photos/id/513/200/300.jpg?hmac=KcBD-M89_o9rkxWW6PS2yEfAMCfd3TH9McppOsf3GZ0",
      "https://fastly.picsum.photos/id/513/200/300.jpg?hmac=KcBD-M89_o9rkxWW6PS2yEfAMCfd3TH9McppOsf3GZ0",
      "https://fastly.picsum.photos/id/1084/200/300.jpg?hmac=JQMQbKvpN6_d6r-fiuOEYe1Dz6f2gfGIkTvsx0nLJUQ",
      "https://fastly.picsum.photos/id/612/200/300.jpg?hmac=vJ35AV5-TQa5ET5az0aESTnI3zaFCjRYD9OnYaiYIYc",
      "https://fastly.picsum.photos/id/612/200/300.jpg?hmac=vJ35AV5-TQa5ET5az0aESTnI3zaFCjRYD9OnYaiYIYc",
      "https://fastly.picsum.photos/id/1084/200/300.jpg?hmac=JQMQbKvpN6_d6r-fiuOEYe1Dz6f2gfGIkTvsx0nLJUQ",
      "https://fastly.picsum.photos/id/513/200/300.jpg?hmac=KcBD-M89_o9rkxWW6PS2yEfAMCfd3TH9McppOsf3GZ0",
      "https://fastly.picsum.photos/id/1084/200/300.jpg?hmac=JQMQbKvpN6_d6r-fiuOEYe1Dz6f2gfGIkTvsx0nLJUQ",
    ]);
  }, []);

  return (
    <Swiper
      loop={true}
      slidesPerView={3}
      spaceBetween={1}
      className="imageSwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`slide ${index}`} />
          <div className="overlay">Vote</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
