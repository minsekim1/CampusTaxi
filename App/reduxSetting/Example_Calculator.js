// import React, { Component } from "react";
// import { View, Text, TextInput, StyleSheet } from "react-native";
// import { connect } from "react-redux";
// import ActionCreator from "../redux/redux";

// ///////////////////////////////////////////////////////////
// //                                                       //
// //               E X A M P L E                           //
// //                                                       //
// ///////////////////////////////////////////////////////////

// class Calculator extends Component {
//   constructor(props, context) {
//     super(props, context);
//   }

//   render() {
//     return (
//       <View style={calculatorStyles.container}>
//         <TextInput
//           style={calculatorStyles.input}
//           keyboardType={"number-pad"}
//           maxLength={1}
//           placeholder={"0"}
//           onChangeText={(text) => {
//             this.setState({ text });
//             var numberAsInt = 0;
//             if (text !== "") {
//               numberAsInt = parseInt(text, 10);
//             }
//             console.log(numberAsInt);
//             this.props.updateFirst(numberAsInt);
//           }}
//           // onSubmitEditing = {() => { this.props.updateFirst(1); }}
//           // placeholderTextColor = {'red'}
//         ></TextInput>
//         <View style={calculatorStyles.view}>
//           <Text s3yle={calculatorStyles.text}>+</Text>
//         </View>
//         <TextInput
//           style={calculatorStyles.input}
//           keyboardType={"number-pad"}
//           maxLength={1}
//           placeholder={"0"}
//           onChangeText={(text) => {
//             this.setState({ text });
//             var numberAsInt = 0;
//             if (text !== "") {
//               numberAsInt = parseInt(text, 10);
//             }
//             console.log(numberAsInt);
//             this.props.updateSecond(numberAsInt);
//           }}
//         ></TextInput>
//         <View style={calculatorStyles.view}>
//           <Text style={calculatorStyles.text}>=</Text>
//         </View>
//         <View style={calculatorStyles.view}>
//           <Text style={calculatorStyles.text}>{this.props.result}</Text>
//         </View>
//       </View>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     result: state.reduxComponent.result,
//     first: state.reduxComponent.sumInfo.first,
//     second: state.reduxComponent.sumInfo.second,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     updateFirst: (num) => {
//       dispatch(ActionCreator.updateSumValueFirst(num));
//     },
//     updateSecond: (num) => {
//       dispatch(ActionCreator.updateSumValueSecond(num));
//     },
//   };
// }

// var FONT_CALCULATOR_DEFULT = 18;

// const calculatorStyles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 50,
//     backgroundColor: "white",
//   },
//   input: {
//     width: 50,
//     height: 50,
//     backgroundColor: "transparent",
//     fontSize: FONT_CALCULATOR_DEFULT,
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: FONT_CALCULATOR_DEFULT,
//     backgroundColor: "transparent",
//   },
//   view: {
//     width: 50,
//     height: 50,
//     backgroundColor: "transparent",
//     justifyContent: "center",
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
