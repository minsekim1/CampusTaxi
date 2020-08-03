import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { observer } from "mobx-react";
import Bbs from "./Bbs";
import BbsStore from "./bbsStore";

@observer
class BbsContainer extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.counterAddRemoveContainer}>
          <TouchableOpacity
            style={styles.counterAddRemoveButton}
            onPress={BbsStore
              .handleAddBbs
              // "a",
              // "a",
              // "a",
              // "a",
              // "a",
              // "a",
              // "a",
              // "a"
              ()}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "700" }}
            >
              Add Counter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.counterAddRemoveButton}
            onPress={BbsStore.handleRemoveCounter}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "700" }}
            >
              Remove Counter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.counterAddRemoveButton}
            onPress={BbsStore.handleUpdateBbs}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "700" }}
            >
              Update Bbs
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.counterFrame}>
          {BbsStore.bbs.map((item, index) => (
            <Bbs key={index} index={index} value={item} />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counterFrame: {
    padding: 10,
  },
  counterAddRemoveContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  counterAddRemoveButton: {
    margin: 10,
    padding: 10,
    flex: 1,
    backgroundColor: "#8041D9",
  },
});

export default BbsContainer;
