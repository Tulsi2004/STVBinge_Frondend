import React from "react";
import { MovieCardType } from "@/types/types";
import { useRouter } from "next/navigation";
import { BsFillStarFill } from "react-icons/bs";
import './MovieCard.css'

const MovieCard = (data:MovieCardType) => {
    const router=useRouter();
    const city="Mumbai";
    const{title, imageUrl,_id, rating, type}=data;
    return(
        <div
            className='moviecard'
            onClick={()=>{
                 router.push(`/${city}/movies/${title}`) //used for moving inside the movies once clicked
            }} >
                <div className="movieimg"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}>
                    <p className="rating">
                        <BsFillStarFill className="star"></BsFillStarFill>
                        &nbsp;&nbsp;
                        {rating}/10
                    </p>
                </div>
                <div className="details">
                    <p className="title" >{title}</p>
                    <p className="type">{type}</p>
                </div>

        </div>
    )
}
export default MovieCard