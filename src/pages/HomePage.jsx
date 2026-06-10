import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

const API_KEY = "YOUR_KEY";

export default function Home() {
    const [search, setSearch] = useState("batman");
    const [movies, setMovies] = useState([]);

    const fetchMovies = useCallback(async () => {
        const res = await fetch(
            `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
        );
        const data = await res.json();
        setMovies(data.Search || []);
    }, [search]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const filteredMovies = useMemo(() => {
        return movies.filter(m => m.Poster !== "N/A");
    }, [movies]);

    return (
        <div>
            <h1>Movie Search</h1>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={fetchMovies}>Search</button>

            <div>
                {filteredMovies.map((movie) => (
                    <div key={movie.imdbID}>
                        <Link to={`/movie/${movie.imdbID}`}>
                            <h3>{movie.Title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}