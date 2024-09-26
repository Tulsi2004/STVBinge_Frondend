"use client";
import React from 'react';
import './SelectSeat.css';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const SelectSeatPage = () => {
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();

    const date = searchParams.get('date');
    const { movieid, cityname, screenid } = params;

    const [screen, setScreen] = React.useState<any>(null);
    const [selectedTime, setSelectedTime] = React.useState<any>(null);
    const [movie, setMovie] = React.useState<any>(null);
    const [selectedSeats, setSelectedSeats] = React.useState<any[]>([]);

    const getschedules = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/schedulebymovie/${screenid}/${date}/${movieid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            const data = await response.json();
            console.log(data); // Log the full response
            if (data.ok) {
                setScreen(data.data.screen);
                setSelectedTime(data.data.movieSchedulesforDate[0]);
            } else {
                console.error(data.message);
            }
        } catch (err) {
            console.error("Error fetching schedules:", err);
        }
    }

    const getMovie = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/movies/${movieid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();
            console.log(JSON.stringify(data),"client side");
            if (data.ok) {
                setMovie(data.data);
            } else {
                console.error(data.message);
            }
        } catch (err) {
            console.error("Error fetching movie:", err);
        }
    }

    React.useEffect(() => {
        getschedules();
        getMovie();
    }, []);

    const selectdeselectseat = (seat: any) => {
        const isSelected = selectedSeats.find((s: any) => (
            s.row === seat.row &&
            s.col === seat.col &&
            s.seat_id === seat.seat_id
        ));

        if (isSelected) {
            setSelectedSeats(selectedSeats.filter((s: any) => (
                s.row !== seat.row ||
                s.col !== seat.col ||
                s.seat_id !== seat.seat_id
            )));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    }

    const generateSeatLayout = () => {
        if (!screen || !selectedTime) {
            console.log("Screen or selected time is not defined."); // Debugging line
            return null; // Ensure both are defined
        }

        const scheduleIndex = screen.movieSchedules.findIndex((t: any) => t.showTime === selectedTime.showTime);
        if (scheduleIndex === -1) {
            console.log("Schedule index not found."); // Debugging line
            return null; // If the show time is not found
        }

        const notAvailableSeats = screen.movieSchedules[scheduleIndex]?.notAvailableSeats || []; // Default to empty array
        console.log("Rendering seat layout with not available seats:", notAvailableSeats); // Debugging line

        return (
            <div>
                {screen.seats.map((seatType: any, index: number) => (
                    <div className="seat-type" key={index}>
                        <h2>{seatType.type} - Rs. {seatType.price}</h2>
                        <div className='seat-rows'>
                            {seatType.rows.map((row: any, rowIndex: number) => (
                                <div className="seat-row" key={rowIndex}>
                                    <p className="rowname">{row.rowname}</p>
                                    <div className="seat-cols">
                                        {row.cols.map((col: any, colIndex: number) => (
                                            <div className="seat-col" key={colIndex}>
                                                {col.seats.map((seat: any, seatIndex: number) => (
                                                    notAvailableSeats.find((s: any) => (
                                                        s.row === row.rowname &&
                                                        s.seat_id === seat.seat_id &&
                                                        s.col === colIndex
                                                    )) ?
                                                        <span className='seat-unavailable' key={seatIndex}>
                                                            {seatIndex + 1}
                                                        </span>
                                                        :
                                                        <span
                                                            className={selectedSeats.find((s: any) => (
                                                                s.row === row.rowname &&
                                                                s.seat_id === seat.seat_id &&
                                                                s.col === colIndex
                                                            )) ? "seat-selected" : "seat-available"}
                                                            onClick={() => selectdeselectseat({
                                                                row: row.rowname,
                                                                col: colIndex,
                                                                seat_id: seat.seat_id,
                                                                price: seatType.price
                                                            })}>
                                                            {seatIndex + 1}
                                                        </span>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const handleBooking = async () => {
        
        // Check if at least one seat is selected
        if (selectedSeats.length === 0) {
            toast.error('Please select at least one seat!');
            return;
        }
    
        // Log booking details for debugging
        console.log('Booking details:', {
        showTime: selectedTime.showTime,
        showDate: date,
        movieId: movieid,
        screenId: screenid,
        seats: selectedSeats,
        totalPrice: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
        paymentId: '123456789',
        paymentType: 'online'
        });
    
        try {
            // Make the fetch request to the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/bookticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Important to include cookies
                body: JSON.stringify({
                    showTime: selectedTime.showTime,
                    showDate: date,
                    movieId: movieid,
                    screenId: screenid,
                    seats: selectedSeats,
                    totalPrice: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
                    paymentId: '123456789', // Dummy payment ID for now
                    paymentType: 'online' // Payment type
                })
            });
    
            // Parse the response
            const data = await response.json();
    
            // Check for a successful response
            if (response.ok) {
                toast.success('Booking Successful');
                window.location.href = "/profile"; // Redirect to profile
            } else {
                console.error("Booking failed:", data);
                toast.error(data.message || 'Booking failed'); // Show error message
            }
        } catch (err) {
            console.error("Error during booking:", err);
            toast.error('An error occurred while booking. Please try again.'); // General error message
        }
    };
    
    React.useEffect(() => {
        getschedules();
    }, []);

    return (
        <div className='selectseatpage'>
            {movie && screen &&
                <div className='s1'>
                    <div className='head'>
                        <h1>{movie.title} - {screen.name}</h1>
                        <h3>{movie.genre.join(" / ")}</h3>
                        <h4>Location: {screen.location || 'Location not available'}</h4>
                    </div>
                </div>
            }

            {screen &&
                <div className="selectseat">
                    <div className='timecont'>
                        {screen.movieSchedules.map((time: any, index: number) => (
                            <h3 className={selectedTime?._id === time._id ? 'time selected' : 'time'}
                                onClick={() => {
                                    setSelectedTime(time);
                                    setSelectedSeats([]);
                                }} key={index}>
                                {time.showTime}
                            </h3>
                        ))}
                    </div>
                    <div className='indicators'>
                        <div>
                            <span className='seat-unavailable'></span>
                            <p>Not available</p>
                        </div>
                        <div>
                            <span className='seat-available'></span>
                            <p>Available</p>
                        </div>
                        <div>
                            <span className='seat-selected'></span>
                            <p>Selected</p>
                        </div>
                    </div>

                    {generateSeatLayout()}

                    <div className='totalcont'>
                        <div className='total'>
                            <h2>Total</h2>
                            <h3>Rs. {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}</h3>
                        </div>
                        <button
                            className='theme_btn1 linkstylenone'
                            onClick={handleBooking}>Book Now</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default SelectSeatPage;
