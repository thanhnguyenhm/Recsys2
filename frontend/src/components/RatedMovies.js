import MovieModule from "./MovieModule";
import React, { useEffect, useState } from "react";

function RatedMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("/rated_movies").then(response =>
            response.json().then(data => {
                setMovies(data.movies);
            })
        );
    }, []);

    var arr = [];
 
    for (var i = 0; i < movies.length; i++) {
        let movie = {
            id: i,
            title: movies[i].title,
            poster: movies[i].poster_path,
            rating: movies[i].rating
        };
        arr.push(movie);
    }

    // TODO: Need to auto refresh rated movies if users change ratings
    return arr.map((movie) => (
        <MovieModule key={movie.id} movie={movie} />
    ));
}

export default RatedMovies;