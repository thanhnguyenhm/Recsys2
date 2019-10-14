import React, { Component } from 'react';
import MovieModule from './MovieModule';
import PropTypes from 'prop-types';

class Movies extends Component {
  render() {
    var arr = [];
    var i = 0
    for (const [key, value] of Object.entries(this.props.movies)) {
        let movie = {
            id: i,
            title: key,
            poster: value
        }
        arr.push(movie)
        i++
    }
    return arr.map((movie) => (
        <MovieModule key={ movie.id } movie={ movie } />
    ));
  }
}

// PropTypes
Movies.propTypes = {
    movies: PropTypes.array.isRequired
}

export default Movies;