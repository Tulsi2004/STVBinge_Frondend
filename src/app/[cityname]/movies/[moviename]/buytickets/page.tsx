"use client"
import React from 'react'
import DatePicker from "react-horizontal-datepicker";
import './BuyTicketsPage.css'
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

const page = () => {

    const movie={
        moviename:"Despicable-me-4",
        date: new Date(),
        language:'English',
        type:'Action,Adventure,Animation,Comedy',
        screens:[
            {
                name:'Screen 1',
                location: 'PVR Cinema, Inordbit, Vashi'
            },
            {
                name:'Screen 1',
                location: 'PVR Cinema, Inordbit, Vashi'
            },
            {
                name:'Screen 1',
                location: 'PVR Cinema, Inordbit, Vashi'
            }
        ]
    }




    return(
        <div className='buytickets'>
            <div className='s1'>
                <div className='head'>
                    <h1>{movie.moviename} - {movie.language} </h1>
                    <h3> {movie.type} </h3>
                </div>
  


            </div> 
            <div className='screens'></div>
        </div>
    )
}

export default page