import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import Routes from "./components/routes";

class Main extends React.Component {
  render() {
    const {
      authData: { isLoggedIn },
    } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1c313a" barStyle="light-content" />
        <Routes isLoggedIn={isLoggedIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
});

export default connect(mapStateToProps, null)(Main);
