
import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Image from 'next/image';

const width = window.innerWidth;
const height = window.innerHeight;
const HomeSlider = () => {

const [banners, setBanners]=useState([
  {
    imgUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/stree-2-et00364249-1721725490.jpg'
  },
  {
    imgUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/tumbbad-et00079092-1726221741.jpg'
  }

])


return (
  <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
  >
      {
          banners.map((banner, index) => {
              return (
                  <SwiperSlide key={index}>
                      <Image src={banner.imgUrl} alt="" width={width} height={height / 2}
                          style={{
                              objectFit: "cover"
                          }} />
                  </SwiperSlide>
              )
          })
      }
  </Swiper>
)
}

export default HomeSlider