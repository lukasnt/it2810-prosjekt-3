import React from 'react';
import './App.css';
import Login from './components/login';
import MovieGrid from './components/movie/moviegrid';
import { testMovies } from './components/movie/testmovies';
import Registration from './components/registration';

function App() {
  return (
    <div className="movie-grid">
      <MovieGrid data={testMovies}/>
      <Login />
      <Registration />
    </div>
  );
}

export default App;
