import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./App.css";
import NavBar2 from './components/NavBar2'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Popular from './components/Popular'

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/index").then(response =>
      response.json().then(data => {
        setMovies(data);
      })
    );
  }, []);

  console.log({ movies })

  return (
    <Router>
      <div className="App" >
        <NavBar2 />
        <div className="container">
          <Route exact path="/" component={Popular} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
        </div>
      </div>
    </Router>
  );
}

export default App;