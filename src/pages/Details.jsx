import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "85130e4b";

export default function Details() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const titleRef = useRef();

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=85130e4b`)

        // fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=85130e4b`)
            .then((res) => res.json())
            .then((data) => setMovie(data));
    }, [id]);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus();
        }
    }, [movie]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h2 tabIndex="0" ref={titleRef}>{movie.Title}</h2>
            <img src={movie.Poster} width="200" />
            <p>{movie.Plot}</p>
        </div>
    );
}


// http://www.omdbapi.com/?i=tt3896198&apikey=85130e4b