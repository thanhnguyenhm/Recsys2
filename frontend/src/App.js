import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./App.css";
import Movies from "./components/Movies";
// import NavBar from './components/NavBar'
import NavBar2 from './components/NavBar2'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/index").then(response =>
      response.json().then(data => {
        setMovies(data);
      })
    );
  }, []);

  console.log({movies})

  return (
    <Router>
      <div className="App" >
        <NavBar2 />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
        </div>
        <div className='.f2 tc'>
          <h1 id='title'>Popular Movies</h1>
        </div>
        <Movies movies={movies} />
      </div>
    </Router>
  );
}

export default App;