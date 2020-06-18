import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 250, height: 85 }}
          source={require("../images/katomi.png")}
        />
        <Text style={styles.logoText}> Bracelet Application</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: "rgba(45, 35, 92,1)",
  },
});
