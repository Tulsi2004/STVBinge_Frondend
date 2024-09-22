"use client"
import React from 'react'
// @ts-ignore
import DatePicker from "react-horizontal-datepicker";
import './BuyTicketsPage.css'
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

const BuyTicketsPage = () => {
    const pathname = usePathname();
    const params = useParams()
    const [selectedDate, setSelectedDate] = React.useState<any>(new Date())
    const { movieid, cityname } = params
    const [movie, setMovie] = React.useState<any>(null)
    const [theatres, setTheatres] = React.useState<any>(null)
    // const [selectedDate, setSelectedDate] = React.useState<any>(null)
    console.log(movieid)


    const getMovie = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies/${movieid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }

    const getTheatres = async (date: string) => {
        let movieId = movieid
        let city = cityname
        
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/screensbymovieschedule/${city}/${date}/${movieId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.ok) {
                            console.log(data)
                            setTheatres(data.data)
                        }
                        else {
                            console.log(data)
                        }
                    })
                     .catch((err) => {
                        console.log(err)
                    })
            }
        
            React.useEffect(() => {
                getMovie()
            }, [])
        
            React.useEffect(() => {
                getTheatres(selectedDate)
            }, [selectedDate])
        
        

    // const movie={
    //     moviename:"Despicable-me-4",
    //     //screen: '4D',
    //     date: new Date(),
    //     language:'English',
    //     type:'Action,Adventure,Animation,Comedy',
    //     screens:[
    //         {
    //             name:'Screen 1',
    //             location: 'PVR Cinema, Inordbit, Vashi'
    //         },
    //         {
    //             name:'Screen 1',
    //             location: 'PVR Cinema, Inordbit, Vashi'
    //         },
    //         {
    //             name:'Screen 1',
    //             location: 'PVR Cinema, Inordbit, Vashi'
    //         }
    //     ]
    // }


    
//   const selectedDay= (val: any) =>{ console.log(val)};


    // return(
    //     <div className='buytickets'>
    //         <div className='s1'>
    //             <div className='head'>
    //                 <h1>{movie.moviename} - {movie.language} </h1>
    //                 <h3> {movie.type} </h3>
    //             </div>
                

    //             {/* <DatePicker getSelectedDay={selectedDay}
    //              endDate={100}
    //              selectedDate={new Date("2020-04-30")}
    //              labelFormat={"MMMM"}
    //              color={"rgb(248,68,100)"}
    //             ></DatePicker> */}


  
    //         </div> 
    //         <div className='screens'>
    //             {
    //                 movie.screens.map((screen,index)=>{
    //                     return(
    //                         <div className='screen' key={index}>
    //                             <div>
    //                                 <h2>{screen.name}</h2>
    //                                 <h3>{screen.location}</h3>
    //                             </div>
    //                             <Link href={`${pathname}/P{screen.name}`} className='theme_btn1 linkstylenone'>Select</Link>
    //                         </div>
    //                     )
    //                 })
    //             }
    //         </div>
    //     </div>
    // )

    return (
        <>
            {
                movie &&
                <div className='buytickets'>
                    <div className='s1'>
                        <div className='head'>
                            <h1>{movie.title} - {movie.language}</h1>
                            <h3>{movie.genre.join(",")}</h3>
                        </div>
                        {<DatePicker getSelectedDay={
                            (date: any) => {
                                console.log(date)
                                setSelectedDate(date)
                            }
                        }
                            endDate={100}
                            selectDate={
                                selectedDate
                            }
                            labelFormat={"MMMM"}
                            color={"rgb(248, 68, 100)"}
                        /> }
                    </div>

                    {
                        theatres && theatres.length > 0 &&
                        <div className='screens'>
                            {
//give the type value in type page for screen and index, it is giving a warning message below. It can be avoided by giving for eg screen:any
                     theatres.map((screen:any, index:number) => {
                                    let screenid = screen._id
                                    return (
                                        <div className='screen' key={index}>
                                            <div>
                                                <h2>{screen.name}</h2>
                                                <h3>{screen.location}</h3>
                                            </div>

                                            <Link href={`${pathname}/${screenid}?date=${selectedDate}`} 
                                            className='theme_btn1 linkstylenone'>Select</Link>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default BuyTicketsPage