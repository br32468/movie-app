import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

const API_KEY = "85130e4b";

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
        return movies.filter((m) => m.Poster && m.Poster !== "N/A");
    }, [movies]);

    const addToFavorites = (movie) => {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        localStorage.setItem("favorites", JSON.stringify([...stored, movie]));
    };

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
                    <div className="movie-card" key={movie.imdbID}>
                        <Link to={`/movie/${movie.imdbID}`}>
                            <h3>{movie.Title}</h3>
                        </Link>

                        <img src={movie.Poster} alt={movie.Title} width="100" />

                        <br />

                        <button onClick={() => addToFavorites(movie)}>
                            Add to Favorites
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}