import { useEffect, useState } from "react";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(stored);
    }, []);

    return (
        <div>
            <h1>Favorites</h1>

            {favorites.length === 0 && <p>No favorites yet.</p>}

            {favorites.map((movie, index) => (
                <div className="movie-card" key={index}>
                    <h3>{movie.Title}</h3>
                    <img src={movie.Poster} width="100" />
                </div>
            ))}
        </div>
    );
}