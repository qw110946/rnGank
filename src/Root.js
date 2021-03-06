import React, { Component } from "react";
import { Provider } from "react-redux";
import { Console } from "~/common/util";

global.Console = Console;

// import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
import store from "./logics/store";

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
