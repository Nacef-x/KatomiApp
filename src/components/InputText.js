import PropTypes from "prop-types";
import React, { Component } from "react";
import { TextInput, Text, View, StyleSheet, Dimensions } from "react-native";
const { width: WIDGH } = Dimensions.get("window");
const propTypes = {
  mapElement: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string,
};

const defaultProps = {
  mapElement: (n) => {},
  onSubmitEditing: () => {},
  onChangeText: () => {},
  value: "",
  placeholder: "",
  maxLength: 200,
  keyboardType: "default",
  secureTextEntry: false,
  label: "",
};

const styles = StyleSheet.create({
  inputBox: {
    width: WIDGH - 60,
    // height: 40,
    color: "#ffffff",

    backgroundColor: "rgba(45, 35, 92,0.97)",
    borderRadius: 15,
    height: 38,
    paddingHorizontal: 18,
    //fontSize: 15,
    marginVertical: 10,
  },
});

class InputText extends Component {
  state = {
    value: "",
  };

  componentDidMount() {
    this.setState({
      value: this.props.value,
    });
  }

  onChangeText = (value) => {
    this.setState(
      {
        value,
      },
      () => {
        this.props.onChangeText(value);
      }
    );
  };

  render() {
    const {
      placeholder,
      secureTextEntry,
      keyboardType,
      maxLength,
      value,
      onChangeText,
      onSubmitEditing,
    } = this.props;
    return (
      <View>
        <TextInput
          style={styles.inputBox}
          //underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={placeholder}
          placeholderTextColor="rgba(250,250,250,0.9)"
          //selectionColor="#999999"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType="next"
          value={this.state.value}
          onSubmitEditing={onSubmitEditing}
          onChangeText={this.onChangeText}
        />
      </View>
    );
  }
}

InputText.defaultProps = defaultProps;

InputText.propTypes = propTypes;

export default InputText;
