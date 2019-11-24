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

    return (
        <Movies movies={movies} />
    )
}

export default RecmdMovies;