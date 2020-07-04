import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ble from "../service/ble";

const styles = StyleSheet.create({
  button: {
    //width: WIDGH - 220,
    flex: 1,
    backgroundColor: "#1c313a",
    borderRadius: 20,
    marginVertical: 35,
    height: 50,
    justifyContent: "center",
    //alignItems: "center",
    padding: 20,
  },

  buttonText: {
    fontSize: 20,
    //fontWeight: "400",
    color: "#ffffff",
    textAlign: "center",
  },
});

const BLE = new Ble();

export default class BleBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ble_status: "Not connected",
      device_status: "-",
    };
  }
  onPress = () => {
    console.log("pressed");
  };

  render() {
    const state = this.state;
    return (
      <View>
        <Ble
          ble_status={state.ble_status}
          device_status={state.device_status}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text>Ble : {state.ble_status} </Text>
          <Text>Device : {state.device_status}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
