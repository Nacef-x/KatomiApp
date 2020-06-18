import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";

import Login from "../pages/login";
import Signup from "../pages/signup";
import Profile from "../pages/Profile";

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Scene>
          <Scene key="root" hideNavBar={true} initial={!this.props.isLoggedIn}>
            <Scene key="login" component={Login} initial={true} />
            <Scene key="signup" component={Signup} title="Register" />
          </Scene>
          <Scene key="app" hideNavBar={true} initial={this.props.isLoggedIn}>
            <Scene key="profile" component={Profile} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
