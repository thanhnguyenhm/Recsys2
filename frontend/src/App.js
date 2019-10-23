import React, { useEffect, useState } from "react";
import "./App.css";
import Movies from "./components/Movies";
import NavBar from './components/NavBar'

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
    <div className="App" >
      <NavBar />
      <div className='.f2 tc'>
        <h1 id='title'>Popular Movies</h1>
      </div>     
      <Movies movies={movies}/>

    </div>
  );
}

export default App;