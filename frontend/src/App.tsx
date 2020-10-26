import React from 'react';
import './App.css';
import Login from './components/login';
import Registration from './components/registration';
import NavigationBar from "./components/navigation/navigationbar";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import SingleMoviePage from "./components/movie/singlemoviepage"
import MoviePage from './components/movie/moviepage';
import FavoritesPage from "./components/movie/favoritepage";


function App() {

  return (
          <BrowserRouter>
              <NavigationBar/>
              <Switch>
                  <Route path="/login">
                      <Login />
                  </Route>
                  <Route path="/registration">
                      <Registration />
                  </Route>
                  <Route path="/favorites">
                      <FavoritesPage />
                  </Route>
                  <Route path="/movie/:tconst" >
                      <SingleMoviePage />
                  </Route>
                  <Route path="/">
                      <MoviePage />
                  </Route>
              </Switch>
          </BrowserRouter>
  );
}

export default App;
