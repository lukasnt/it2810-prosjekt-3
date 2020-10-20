import React from 'react';
import './App.css';
import Login from './components/login';
import Registration from './components/registration';
import NavigationBar from "./components/navigation/navigationbar";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MoviePage from './components/movie/moviepage';


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
                  <Route path="/">
                      <MoviePage />
                  </Route>
              </Switch>
          </BrowserRouter>
  );
}

export default App;
