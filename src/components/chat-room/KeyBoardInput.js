import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  PixelRatio,
  Platform,
  Switch,
} from 'react-native';
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import PropTypes from 'prop-types';
import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';
import {KeyboardRegistry} from 'react-native-keyboard-input';
import {_} from 'lodash';
import axios from "axios";

import './KeyboardView';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

export default class KeyBoardInput extends Component {
  static propTypes = {
    message: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
    this.onKeyboardItemSelected = this.onKeyboardItemSelected.bind(this);
    this.resetKeyboardView = this.resetKeyboardView.bind(this);
    this.onKeyboardResigned = this.onKeyboardResigned.bind(this);
    this.showLastKeyboard = this.showLastKeyboard.bind(this);
    this.isCustomKeyboardOpen = this.isCustomKeyboardOpen.bind(this);

    this.state = {
      customKeyboard: {
        component: undefined,
        initialProps: undefined,
      },
      receivedKeyboardData: undefined,
      useSafeArea: true,
      keyboardOpenState: false,
    };
  }

  onKeyboardItemSelected(keyboardId, params) {
    const receivedKeyboardData = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(params)}`;
    console.log(receivedKeyboardData);
    this.props.setMessageType("IMAGE");
    this.setState({receivedKeyboardData});
    this.props.setMessage(params.message);
  }

  onKeyboardResigned() {
    this.setState({keyboardOpenState: false});
    this.resetKeyboardView();
  }

  getToolbarButtons() {
    return [
      {
        text: 'f1',
        testID: 'f1',
        onPress: () => {
          launchCamera(
            { mediaType: "photo", includeBase64: true },
            (response) => {
              console.log(response.errorMessage);
              if (response.base64) {
                //setFile(response.base64);
              }
            }
          );
        },
      },
      {
        text: 'f2',
        testID: 'f2',
        onPress: () => {
          launchImageLibrary(
            { mediaType: "photo", includeBase64: true },
            (response) => {
              if (response.base64) {
                console.log(response.base64);

                axios
                  .post(
                    `http://192.168.219.107:3003/uploadImage/`,
                    {
                      imageBase64: response.base64,
                    },
                    {
                      headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((d) => {
                    console.log(d);
                  });
                    
              //   fetch('http://192.168.219.107:3003/uploadImage/', {
              //     method: 'POST',
              //     headers: {Accept: 'application / json', 'Content - Type': 'application / json'},
              //     body: JSON.stringify({
              //       imgsource: response.base64,
              //   }),
              // })
              }
            }
          );
        },
      },
      {
        text: 'f3',
        testID: 'f3',
        onPress: () => this.showKeyboardView('ImoticonKeyboardView', 'text'),
      },
    ];
  }

  resetKeyboardView() {
    this.setState({customKeyboard: {}});
  }

  showKeyboardView(component, title) {
    this.setState({
      keyboardOpenState: true,
      customKeyboard: {
        component,
        initialProps: {title},
      },
    });
  }

  dismissKeyboard() {
    KeyboardUtils.dismiss();
  }

  showLastKeyboard() {
    const {customKeyboard} = this.state;
    this.setState({customKeyboard: {}});

    setTimeout(() => {
      this.setState({
        keyboardOpenState: true,
        customKeyboard,
      });
    }, 500);
  }

  isCustomKeyboardOpen = () => {
    const {keyboardOpenState, customKeyboard} = this.state;
    return keyboardOpenState && !_.isEmpty(customKeyboard);
  }

  toggleUseSafeArea = () => {
    const {useSafeArea} = this.state;
    this.setState({useSafeArea: !useSafeArea});

    if (this.isCustomKeyboardOpen()) {
      this.dismissKeyboard();
      this.showLastKeyboard();
    }
  }

  safeAreaSwitchToggle = () => {
    if (!IsIOS) {
      return (<View />);
    }
    const {useSafeArea} = this.state;
    return (
      <View style={styles.safeAreaSwitchContainer}>
        <Text>Safe Area Enabled:</Text>
        <Switch style={styles.switch} value={useSafeArea} onValueChange={this.toggleUseSafeArea}/>
      </View>
    );
  }

  keyboardAccessoryViewContent() {
    return (
      <View style={styles.keyboardContainer}>
        <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>
        <View style={styles.inputContainer}>
          <TextInput
            maxHeight={200}
            style={styles.textInput}
            ref={(r) => {
              this.textInputRef = r;
            }}
            placeholder={'Message'}
            underlineColorAndroid="transparent"
            onFocus={() => this.resetKeyboardView()}
            testID={'input'}

            value={this.props.message}
            autoCapitalize="none"
            returnKeyType="none"
            multiline={true}
            onChangeText={this.props.setMessage}
          />
          <TouchableOpacity 
            style={styles.sendButton}
            disabled={this.props.message ? false : true} 
            onPress={() => {
              this.props.setMessage("");
              this.props.onSubmitEditing(this.props.message, this.props.messageType);
              this.props.setMessageType("NORMAL");
            }}
            >
            <Text>SEND</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {
            this.getToolbarButtons().map((button, index) =>
              <TouchableOpacity
                onPress={button.onPress}
                style={{paddingLeft: 15, paddingBottom: 10}}
                key={index}
                testID={button.testID}
              >
                <Text>{button.text}</Text>
              </TouchableOpacity>)
          }
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        {/* <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
        >
          <Text style={styles.welcome}>{this.props.message ? this.props.message : 'Keyboards example'}</Text>
          <Text testID={'demo-message'}>{this.state.receivedKeyboardData}</Text>
          { this.safeAreaSwitchToggle() }
        </ScrollView> */}

        <KeyboardAccessoryView
          renderContent={this.keyboardAccessoryViewContent}
          onHeightChanged={height => this.setState({keyboardAccessoryViewHeight: IsIOS ? height : undefined})}
          trackInteractive={TrackInteractive}
          kbInputRef={this.textInputRef}
          kbComponent={this.state.customKeyboard.component}
          kbInitialProps={this.state.customKeyboard.initialProps}
          onItemSelected={this.onKeyboardItemSelected}
          onKeyboardResigned={this.onKeyboardResigned}
          revealKeyboardInteractive
          useSafeArea={this.state.useSafeArea}
        />
      </View>
    );
  }
}

const COLOR = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR,
  },
  scrollContainer: {
    justifyContent: 'center',
    padding: 15,
    height: 200,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  keyboardContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: COLOR,
      },
    }),
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 5,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 0.5 / PixelRatio.get(),
    borderRadius: 18,
  },
  sendButton: {
    paddingRight: 5,
    paddingLeft: 5,
    alignSelf: 'center',
  },
  switch: {
    marginLeft: 15,
  },
  safeAreaSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
