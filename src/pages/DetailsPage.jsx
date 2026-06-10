import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "YOUR_KEY";

export default function Details() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const titleRef = useRef();

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => setMovie(data));
    }, [id]);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus(); // useRef example
        }
    }, [movie]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <h2 tabIndex="0" ref={titleRef}>{movie.Title}</h2>
            <p>{movie.Plot}</p>
        </div>
    );
}