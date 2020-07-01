import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";

import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";

import InputText from "../components/InputText";
import { loginUser } from "../actions/auth.actions";
import Logo from "../components/Katomi_Logo";
//import Form from "../components/form";
import Loader from "../components/Loader";
import { Actions } from "react-native-router-flux";
const { width: WIDGH } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BEC0AC",
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
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
  },
  signupButton: {
    color: "#8143bb",
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    width: WIDGH - 90,
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
});

class Login extends React.Component {
  signup() {
    Actions.signup();
  }

  loginUser = async (values) => {
    try {
      const response = await this.props.dispatch(loginUser(values));
      console.log("loginUSer", response);
      if (!response) {
        throw new Error("Something happened");
      }
      if (!response.success) {
        throw new Error(response.responseBody.message);
      }
    } catch (error) {
      let errorText;
      if (error.message) {
        errorText = error.message;
      }
      Alert.alert("Login Error!", errorText, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    }
  };

  onSubmit = (values) => {
    this.loginUser(values);
  };

  renderTextInput = (field) => {
    const {
      meta: { touched, error },
      label,
      secureTextEntry,
      maxLength,
      keyboardType,
      placeholder,
      input: { onChange, ...restInput },
    } = field;
    return (
      <View>
        <InputText
          onChangeText={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          label={label}
          {...restInput}
        />
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

  render() {
    const { handleSubmit, loginUser } = this.props;
    console.log("loginUser render ", loginUser);
    return (
      <View style={styles.container}>
        {loginUser && loginUser.isLoading && <Loader />}
        <Logo />
        <Field
          name="email"
          placeholder="Enter your email"
          component={this.renderTextInput}
        />
        <Field
          name="password"
          placeholder="Enter your password"
          secureTextEntry={true}
          component={this.renderTextInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(this.onSubmit)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Do not have an account yet?</Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const validate = (values) => {
  console.log("validating...");

  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

mapStateToProps = (state) => ({
  loginUser: state.authReducer.loginUser,
});

mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "login",
    validate,
  })
)(Login);
