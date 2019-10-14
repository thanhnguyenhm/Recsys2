import React, { Component } from 'react';
import Movies from './components/Movies'

import './App.css';

class App extends Component {
  state = {
    movies: window.topN
  }

  render() {
    return (
      <div className="App">
        <h1>Welcom to Movie Recommendation System</h1>
        <h2>Popular Movies</h2>
        <Movies movies={ this.state.movies } />
      </div>
    );
  }
}

export default App;
