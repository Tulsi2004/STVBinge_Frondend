import react from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import { MovieCardType } from '@/types/types';
import MovieCard from './MovieCard';

const MovieCarousel=() => {
    const Movies:MovieCardType[]=[
        {
            title:"Despicable-me-4",
            imageUrl:"https://assets-in.bmscdn.com/iedb/movies/images/website/poster/large/despicable-me-4-et00386901-1715335701.jpg",
            _id: "1",
            rating: 8.5,
            type:"Action,Adventure,Animation,Comedy"
        },
        {
            title:"Despicable-me-4",
            imageUrl:"https://assets-in.bmscdn.com/iedb/movies/images/website/poster/large/despicable-me-4-et00386901-1715335701.jpg",
            _id: "1",
            rating: 8.5,
            type:"Action,Adventure,Animation,Comedy"
        },
        {
            title:"Despicable-me-4",
            imageUrl:"https://assets-in.bmscdn.com/iedb/movies/images/website/poster/large/despicable-me-4-et00386901-1715335701.jpg",
            _id: "1",
            rating: 8.5,
            type:"Action,Adventure,Animation,Comedy"
        },
        {
            title:"Despicable-me-4",
            imageUrl:"https://assets-in.bmscdn.com/iedb/movies/images/website/poster/large/despicable-me-4-et00386901-1715335701.jpg",
            _id: "1",
            rating: 8.5,
            type:"Action,Adventure,Animation,Comedy"
        },
        {
            title:"Despicable-me-4",
            imageUrl:"https://assets-in.bmscdn.com/iedb/movies/images/website/poster/large/despicable-me-4-et00386901-1715335701.jpg",
            _id: "1",
            rating: 8.5,
            type:"Action,Adventure,Animation,Comedy"
        },
        {
            title:"Despicable-me-4",
            imageUrl:"https://assets-in.bmscdn.com/iedb/movies/images/website/poster/large/despicable-me-4-et00386901-1715335701.jpg",
            _id: "1",
            rating: 8.5,
            type:"Action,Adventure,Animation,Comedy"
        },
        {
            title:"Despicable-me-4",
            imageUrl:"https://assets-in.bmscdn.com/iedb/movies/images/website/poster/large/despicable-me-4-et00386901-1715335701.jpg",
            _id: "1",
            rating: 8.5,
            type:"Action,Adventure,Animation,Comedy"
        }

    ];
    return(
        <div className='sliderout'>
            <Swiper
            slidesPerView={1}
            spaceBetween={1}
            pagination={{clickable:true,}}
            breakpoints={{
                '@0.00':{
                    slidesPerView: 1,
                    spaceBetween: 2,
                },
                '@0.75':{
                    slidesPerView: 2,
                    spaceBetween: 2,
                },
                '@1.00':{
                    slidesPerView: 3,
                    spaceBetween: 2,
                },
                '@1.50':{
                    slidesPerView: 6,
                    spaceBetween: 2,
                },
            }}
            modules={[Pagination]}
            className='mySwiper'
            >
            {
                Movies.map((Movie)=>{
                return(
                    <SwiperSlide>
                        <MovieCard{...Movie}/>
                    </SwiperSlide>
                )
            })
        }
            </Swiper>
        </div>
    )




}

export default MovieCarousel;