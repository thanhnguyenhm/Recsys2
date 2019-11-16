import React, { Component } from 'react';
import MovieModule from './MovieModule';
// import PropTypes from 'prop-types';

class Movies extends Component {
    render() {
        var arr = [];
        var i = 0
        {/*for (const [key, value] of Object.entries(this.props.movies)) {
            let movie = {
                id: i,
                title: key,
                poster: value
            }
            arr.push(movie)
            i++
        }*/}
        for (var i = 0; i < this.props.movies.length; i++) {
            let movie = {
                id: this.props.movies[i].movie_id,
                title: this.props.movies[i].title,
                poster: this.props.movies[i].poster_path,
                rating: this.props.movies[i].rating
            };
            arr.push(movie);
        }
        return arr.map((movie) => (
            <MovieModule key={movie.id} movie={movie}/>
        ));
    }
}

// // PropTypes
// Movies.propTypes = {
//     movies: PropTypes.isRequired
// }

export default Movies;