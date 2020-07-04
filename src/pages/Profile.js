import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

import { connect } from "react-redux";
import Logo from "../components/Katomi_Logo";
const { width: WIDGH } = Dimensions.get("window");

import { logoutUser } from "../actions/auth.actions";
import { sendEvents } from "../actions/events.actions";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import Ble from "../components/ble";

//HrDate = 0;
//SpODate = 0;
//MotionDate = 0;

//HrMesure = 0;
//SpOMesure = 0;
//MotionMesure = 0;

var Time = new Date().toLocaleString();
console.log(Time);
//let Time = new Date().toLocaleString;
//let a = T.getMinutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    paddingVertical: 140,
    position: "relative",
    backgroundColor: "#BEC0AC",
  },
  InfoContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  head: { height: 45, backgroundColor: "#854EAE" },
  text: { margin: 15 },
  button: {
    //width: WIDGH - 220,
    flex: 1,
    backgroundColor: "#1c313a",
    borderRadius: 20,
    height: 50,
    justifyContent: "center",
    //alignItems: "center",
    padding: 5,
    margin: 5,
  },

  buttonText: {
    fontSize: 20,
    //fontWeight: "400",
    color: "#ffffff",
    textAlign: "center",
  },
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Sensor", "Mesure"],
      /*tableData: [
        ["Heart Rate", HrMesure],
        ["SpO²", SpOMesure],
        ["Motion", MotionMesure],
        ["Time", Time],
      ],*/
      sensors: [
        //{ _id: '', name: 'HrDate', value: "" },
        //{ _id: '', name: 'SpODate', value: "" },
        //{ _id: '', name: 'MotionDate', value: "" },
        { _id: "5ede967b61b43502f829547f", name: "HrMesure", value: 0 },
        { _id: "5ede972a61b43502f8295482", name: "SpOMesure", value: 0 },
        { _id: "5ede96b761b43502f8295481", name: "MotionMesure", value: 0 },
        { _id: "", name: "Time", value: new Date().toLocaleString() },
      ],
    };
  }
  /* sensors_arr = () => {
    this.state.sensors.map((s) => [s.name, s.value]);
  };
  tableData = () => this.sensors_arr; */

  sendEvents = () => {
    let data_sensors = this.state.sensors;
    let data_time = this.state.sensors[3].value;

    this.props.dispatch(sendEvents({ sensors: data_sensors, time: data_time }));
  };
  logoutUser = () => {
    this.props.dispatch(logoutUser());
  };

  updateValue = (val) => {
    let new_sensors = this.state.sensors;
    new_sensors[0].value = val;
    new_sensors[3].value = new Date().toLocaleString();
    this.setState({ sensors: new_sensors });
  };

  render() {
    const state = this.state;
    var sensors_arr = this.state.sensors.map((s) => [s.name, s.value]);
    return (
      <ScrollView style={styles.container}>
        <Logo />
        <Table
          borderStyle={{ borderWidth: 2, borderColor: "rgba(45, 35, 92,0.99)" }}
        >
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={sensors_arr} textStyle={styles.text} />
        </Table>

        <View style={styles.InfoContainer}>
          <Ble onUpdate={this.updateValue} />
        </View>
        <View style={styles.buttonsContainer}>
          <PostButton text="Post" onPress={this.sendEvents} />
          <LogoutButton text="Logout" onPress={this.logoutUser} />
        </View>
      </ScrollView>
    );
  }
}

export function PostButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

export function LogoutButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

//logoutUser = () => {
// this.props.dispatch(logoutUser());
//};
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.HrMesure = "can't get Heart rate ";
  }
  if (!values.email) {
    errors.SpOMesure = "can't get SpOMesure ";
  }
  if (!values.password) {
    errors.MotionMesure = "can't get MotionMesure";
  }
  return errors;
};
mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser,
});
mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
