import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

//import Routes from "./src/components/routes";
import store from "./src/config/store";

import Main from "./src/main";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
