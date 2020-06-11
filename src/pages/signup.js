import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

import Logo from "../components/Katomi_Logo";
import Form from "../components/form";
//import InputText from "../components/InputText";
import { Actions } from "react-native-router-flux";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#455a64",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  signupText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
  },
  signupButton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  inputBox: {
    width: 300,
    backgroundColor: "rgba(255, 255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10,
  },
});

export default class Signup extends React.Component {
  goBack() {
    Actions.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Form type="Signup" />
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={this.goBack}>
            <Text style={styles.signupButton}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
