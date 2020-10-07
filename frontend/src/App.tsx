import React from 'react';
import './App.css';
import Login from './components/login';
import MovieGrid from './components/movie/moviegrid';
import { testMovies } from './components/movie/testmovies';
import Registration from './components/registration';
import NavigationBar from "./components/navigation/navigationbar";

function App() {
  return (
    <div>
      <NavigationBar/>
      <div className="movie-grid">
          <MovieGrid data={testMovies}/>
      </div>
      <Login />
      <Registration />
    </div>
  );
}

export default App;
