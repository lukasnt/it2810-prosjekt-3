import React from 'react';
import './App.css';
import Login from './components/user/login';
import Registration from './components/user/registration';
import NavigationBar from "./components/navigation/navigationbar";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import SearchPage from './components/search/searchpage';
import FavoritesPage from "./components/movie/favoritepage";
import MoviePage from './components/movie/moviepage';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";


function App() {

    const theme = createMuiTheme({
        palette: {
            primary : {main: '#00509D'},
            secondary: {main: '#23CE6B'},
            }
        });

    return (
      <MuiThemeProvider theme={theme}>
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
                      <MoviePage />
                  </Route>
                  <Route path="/">
                      <SearchPage />
                  </Route>
              </Switch>
          </BrowserRouter>
      </MuiThemeProvider>
    );
    }

export default App;
