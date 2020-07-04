import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer"; // To encode/decode data

export default class Ble extends React.Component {
  subscription = null;
  constructor(props) {
    super(props);
    this.state = {
      ble_status: "Not connected",
      device_status: "Not connected",
    };
    if (!this.manager) {
      this.manager = new BleManager();
    }
    this.subscribe();
  }

  componentWillUnmount = () => {
    if (this.subscription) {
      this.subscription.remove();
    }
  };

  onPress = () => {
    console.log("pressed");
  };

  render() {
    const state = this.state;
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Text>Device : {state.device_status}</Text>
          <Text>Ble : {state.ble_status} </Text>
        </TouchableOpacity>
      </View>
    );
  }

  subscribe = () => {
    this.subscription = this.manager.onStateChange((state) => {
      console.log("BLE STATE changed", state);

      if (state === "PoweredOff") {
        this.setState({ ble_status: "OFF" });
      }

      if (state === "PoweredOn") {
        this.setState({ ble_status: "ON" });
        this.scanAndConnect();
        //subscription.remove();
      }
    }, true);
  };

  scanAndConnect = () => {
    console.log("Scanning...");

    this.setState({ ble_status: "Scanning..." });
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        this.setState({ ble_status: "Error" });
        return;
      }
      // Check if it is the device you are looking.
      if (device.name === "Katomi") {
        this.setState({ device_status: "Found" });
        this.device == device;
        this.manager.stopDeviceScan();
        this.setState({ device_status: "Connecting..." });
        this.connect(device);
      }
    });
  };
  connect = (device = this.device) => {
    device
      .connect()
      .then(async (device) => {
        let out = await device.discoverAllServicesAndCharacteristics();
        //console.log(out);
        this._showAllCharacteristics(device);

        //this.readFromDevice(out);
        return out;
      })
      .then((device) => {
        this.setState({ device_status: "Connected" });
        this.setState({ ble_status: "ON" });
      })
      .then((device) => {
        this.setState({ ble_status: "ON - Monitoring..." });
      })
      .catch((error) => {
        // Handle errors
        this.setState({ device_status: "Error connecting!" });
        console.log("BLE cnx error", error);
      });
  };

  _showAllCharacteristics(device) {
    this.manager
      .servicesForDevice(device.id)
      .then((services) => {
        //console.log("SERVICES = ", services);

        services.forEach((s) => {
          this.manager
            .characteristicsForDevice(device.id, s.uuid)
            .then((char) => {
              if (!char[0]) return;
              if (!char[0].uuid.includes("0000ffe1")) return;
              this.readFromDevice(device, s, char[0]);

              //console.log("\n\nCHARS = ", char[0].uuid);
              //console.log("VAL -->", char.value);
            })
            .catch((err) => console.log("CHAR ERR", err));
        });
      })
      .catch((err) => console.log("SERV ERR", err));
  }

  readFromDevice = (device, service, char) => {
    console.log("char.uuid", char.uuid);

    /* device
      .readCharacteristicForService(service.uuid, char.uuid)
      .then((out) => {
        console.log("VALUE", out.value);

        console.log("READ OUT", out);
      })
      .catch((err) => console.log("read err", err)); */
    char.monitor((error, char) => {
      if (error) {
        console.log("monitor ERR", error);
        return;
      }
      if (!char.value) {
        console.log("NO value received!");
      } else {
        const buffer = new Buffer(char.value, "base64");
        const val_hex = buffer.toString("hex");
        const val_int = parseInt(val_hex, 16);
        //TODO: redux
        this.updateValue(val_int);
        console.log("new val", val_int);
      }
    });
  };

  updateValue = (val) => {
    this.props.onUpdate(val);
  };
}
