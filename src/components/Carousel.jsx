
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '../assets/images/volunteer-1.jpg'
import img2 from '../assets/images/volunteer-2.jpg'
import img3 from '../assets/images/volunteer-3.jpg'
const text = "Be the change you wish to see in the world - volunteer with us!"
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

export default function Carousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop='true'
        autoplay={{
            
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Slide text={text} image={img1}></Slide>
        </SwiperSlide>
        <SwiperSlide>
            <Slide text={text} image={img2}></Slide>
        </SwiperSlide>
        <SwiperSlide>
            <Slide text={text} image={img3}></Slide>
        </SwiperSlide>
        

      </Swiper>
    </>
  );
}
