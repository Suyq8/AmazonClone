import { Carousel } from 'react-responsive-carousel';
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  const getImages = (name) => (
    <div key={name}>
      <img src={`panels/${name}.jpg`} loading='lazy' />
    </div>
  );

  return (
    <div className="relative">
      <div className="w-full bottom-0 bg-gradient-to-t from-[#eaeded] to-transparent z-10 absolute h-40" />
      <Carousel showThumbs={false} showStatus={false} showIndicators={false}
        useKeyboardArrows infiniteLoop autoPlay interval={10000}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(getImages)}
      </Carousel>
    </div>
  )
}

export default Banner