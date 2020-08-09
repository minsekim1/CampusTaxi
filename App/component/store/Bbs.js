import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { observer } from "mobx-react";
import BbsStore from "./BbsStore";

@observer
class Bbs extends React.Component {
  render() {
    const { index, value } = this.props;
    return (
      <View index={value.toString()} style={styles.counterContainer}>
        <Text style={styles.counterInfo}>
          Count: {BbsStore.bbs[index].counterNum}
          a: {BbsStore.bbs[index].a}
          b: {BbsStore.bbs[index].b}
          c: {BbsStore.bbs[index].c}
          f: {BbsStore.bbs[index].f}
          g: {BbsStore.bbs[index].g}
          h: {BbsStore.bbs[index].h}
          i: {BbsStore.bbs[index].i}
          j: {BbsStore.bbs[index].j}
          k: {BbsStore.bbs[index].k}
          m: {BbsStore.bbs[index].m}
          n: {BbsStore.bbs[index].n}
        </Text>
        <View style={styles.counterBtnContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => BbsStore.handleIncrement({ index })}
          >
            <Text style={{ color: "#4C4C4C" }}>INCREMENT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => BbsStore.handleDecrement({ index })}
          >
            <Text style={{ color: "#4C4C4C" }}>DECREMENT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counterContainer: {
    width: "100%",
    height: 100,
    padding: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginBottom: 10,
  },
  counterInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
  },
  counterBtnContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  counterButton: {
    backgroundColor: "#D1B2FF",
    marginLeft: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Bbs;
