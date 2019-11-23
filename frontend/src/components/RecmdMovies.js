import Movies from "./Movies";
import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'

function RecmdMovies() {
    const [movies, setMovies] = useState([]);

    // get current username
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    const user = decoded.identity.username;

    const url = "/rec_movies/" + user

    useEffect(() => {
        fetch(url).then(response =>
            response.json().then(data => {
                setMovies(data.movies);
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

/*    var arr = [];

    for (var i = 0; i < movies.length; i++) {
        let movie = {
            id: movies[i].movie_id,
            title: movies[i].title,
            poster: movies[i].poster_path,
            rating: movies[i].rating
        };
        arr.push(movie);
    }
*/
    return (
        <Movies movies={movies} />
    )
}

export default RecmdMovies;