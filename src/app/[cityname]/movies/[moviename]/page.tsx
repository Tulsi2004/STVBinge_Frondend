//Page will appear after clicking the movie

"use client"
import React, { use } from 'react';
import { BsShare } from 'react-icons/bs';
import { BsFillStarFill } from "react-icons/bs";
import './MoviePage.css'
import MovieCarousel from '@/components/MovieCarousel/MovieCarousel';

import 'swiper/css';
import 'swiper/css/pagination';
import {Swiper,SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import CelebCard from '@/components/CelebCard/CelebCard';
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link';

const MoviePage=()=> {
    const pathname = usePathname();
    const movie={
    wideposter: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/despicable-me-4-et00386901-1715335701.jpg",
    portraitposter:"https://assets-in.bmscdn.com/iedb/movies/images/website/poster/large/despicable-me-4-et00386901-1715335701.jpg",
    title: "Despicable-me-4",
    rating: 8.5,
    halls:[
        "2D",
        "3D"
    ],
    languages:[
        "English",
        "Telugu",
        "Hindi"
    ],
    duration:"2h 15m",
    type: "Action,Adventure,Animation,Comedy",
    releasedate:"5 Jul 2024",
    cast:[
        {
            _id:"1",
            name: "Steve Carell",
            role: "Artist",
            imageUrl:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/steve-carell-2242-24-03-2017-12-33-52.jpg"
        },
        {
            _id:"1",
            name: "Steve Carell",
            role: "Artist",
            imageUrl:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/steve-carell-2242-24-03-2017-12-33-52.jpg"
        },
        {
            _id:"1",
            name: "Steve Carell",
            role: "Artist",
            imageUrl:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/steve-carell-2242-24-03-2017-12-33-52.jpg"
        },
        {
            _id:"1",
            name: "Steve Carell",
            role: "Artist",
            imageUrl:"https://in.bmscdn.com/iedb/artist/images/website/poster/large/steve-carell-2242-24-03-2017-12-33-52.jpg"
        },
    ],
    crew:[
        {
            _id:"1",
            name: "Chris Renaud",
            role: "Director",
            imageUrl:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/chris-renaud-18459-10-06-2019-02-14-21.jpg"
        },
        {
            _id:"1",
            name: "Chris Renaud",
            role: "Director",
            imageUrl:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/chris-renaud-18459-10-06-2019-02-14-21.jpg"
        },
        {
            _id:"1",
            name: "Chris Renaud",
            role: "Director",
            imageUrl:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/chris-renaud-18459-10-06-2019-02-14-21.jpg"
        },
        {
            _id:"1",
            name: "Chris Renaud",
            role: "Director",
            imageUrl:"https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/chris-renaud-18459-10-06-2019-02-14-21.jpg"
        },
    ],
    about:"Gru welcomes a new member to the family, Gru Jr., who's intent on tormenting his dad. However, their peaceful existence crashes when criminal mastermind Maxime Le Mal escapes from prison and vows revenge against Gru."

}



    return (
        <>
        {
        <div className='moviepage'>
            <div className='c1'
                style={{
                    backgroundImage: `url(${movie.wideposter})`
                }}>
                    <div className='c11'>
                        <div className='left'>
                            <div className='movie_poster' style={{
                                backgroundImage: `url(${movie.portraitposter})`
                            }}>
                                <p>In cinemas</p>
                            </div>
                            <div className='movie_details'>
                                <p className='title'>{movie.title}</p>
                                <p className='rating'><BsFillStarFill className='star'></BsFillStarFill>&nbsp;&nbsp;
                                {movie.rating}/10
                                </p>
                                <div className='halls_languages'>
                                    <p className='halls'>
                                    {
                                        movie.halls.map((hall, index)=>{
                                            return(
                                                <span key={index}>{hall}</span>
                                            )
                                        })
                                    }
                                    </p>
                                    <p className='languages'>
                                        {
                                        movie.languages.map((language, index)=>{
                                            return(
                                                <span key={index}>{language}</span>
                                            )
                                        })}
                                    </p>
                                </div>
                                <p className='duration_type_releasedat'>
                                    <span className='duration'>{movie.duration}</span>
                                    <span>.</span>
                                    <span className='type'>{movie.type}</span>
                                    <span>.</span>
                                    <span className='releasedat'>{movie.releasedate}</span>
                                </p>
                                <Link href={`${pathname}/buytickets`}
                                className='linkstylenone'>
                                <button className='bookbtn'>Book Tickets</button>
                                </Link>
                            </div>
                        </div>
                        <div className='right'>
                            <button className='sharebtn'><BsShare className='shareicon'>Share</BsShare></button>
                        </div>
                    </div>
            </div>
            <div className='c2'>
                        <h1>About the Movie</h1>
                        <p>{movie.about}</p>
                        {
                            movie.cast.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Cast</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.cast.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...cast} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        }
                        {
                            movie.crew.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Crew</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.crew.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...cast} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        }
                        <div className='line'></div>
                        <h1>Your might also like</h1>
                        <MovieCarousel />
                    </div>

                </div>
            }
        </>
    )
}

export default MoviePage
