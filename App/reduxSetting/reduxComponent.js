import React, { Component } from "react";
import { connect } from "react-redux";
import ActionCreator from "./redux";

class reduxExam extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <Button
        onPress={() => {
          this.props.updateFirst(2);
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    result: state.reduxComponent.result,
    first: state.reduxComponent.sumInfo.first,
    second: state.reduxComponent.sumInfo.second,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateFirst: (num) => {
      dispatch(ActionCreator.updateSumValueFirst(num));
    },
    updateSecond: (num) => {
      dispatch(ActionCreator.updateSumValueSecond(num));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxExam);
