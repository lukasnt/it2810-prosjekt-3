import React from 'react';
import './App.css';
import Login from './components/login';
import Registration from './components/registration';
import { Provider } from "react-redux";
import { store } from "./components/utils/store";

function App() {
  return (
      <Provider store={store}>
        <Login />
        <Registration />
      </Provider>
    );
}

export default App;
