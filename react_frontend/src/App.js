import React, { Component } from 'react';
import Movies from './components/Movies'

import './App.css';

class App extends Component {
  state = {
    movies: {},
  }

  componentDidMount() {
    fetch('/popular').then(response => response.json()).then(data => this.setState({movies: data}))
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="App">
        <h1>Welcom to Movie Recommendation System</h1>
        <Search />
        <h2>Popular Movies</h2>
        <Movies movies={ movies } />
      </div>
    );
  }
}

export default App;