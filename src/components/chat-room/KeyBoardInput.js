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
  Image,
} from 'react-native';
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import PropTypes from 'prop-types';
import { KeyboardAccessoryView, KeyboardUtils } from 'react-native-keyboard-input';
import { KeyboardRegistry } from 'react-native-keyboard-input';
import { _ } from 'lodash';
import axios from "axios";
import { premiumURL } from "../../constant";
import { CancleIcon } from "../../components/icon/chat-room/CancleIcon"
import { GalleryIcon } from "../../components/icon/chat-room/GalleryIcon"
import { SmileIcon } from "../../components/icon/chat-room/SmileIcon"
import { SendArrowIcon } from "../../components/icon/chat-room/SendArrowIcon"
import { CameraIcon } from "../../components/icon/chat-room/CameraIcon"

import './KeyboardView';
import ImageResizer from 'react-native-image-resizer';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;
const isBase64 = require('is-base64');
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
    // console.log(receivedKeyboardData);
    this.props.setMessageType("IMAGE");
    this.setState({ receivedKeyboardData });

    this.props.setMessage(params.message);
    console.log('params.message', typeof params.message)
    console.log(Object.keys(params));
    console.log("siba521", isBase64(params.message))
  }

  onKeyboardResigned() {
    this.setState({ keyboardOpenState: false });
    this.resetKeyboardView();
  }

  getToolbarButtonsLeft() {
    return [
      {
        text: 'camera',
        icon: <CameraIcon />,
        testID: 'f1',
        onPress: () => {
          launchCamera(
            { mediaType: "photo", includeBase64: true, quality: 0.5, maxHeight: 2016, maxWidth: 2016 },
            (response) => {
              console.log(response.errorMessage);
              if (response.base64) {
                // console.log("textinpupt photo ... f1");
                // console.log("response.base64 f1", response.base64.length)

                this.onKeyboardItemSelected('f1', { "message": response.base64 });
                // })
              }
            }
          );
        },
      }
    ];
  }

  getToolbarButtonsRight() {
    return [
      {
        text: 'gallery',
        icon: <GalleryIcon />,
        testID: 'f2',
        onPress: () => {
          launchImageLibrary(
            { mediaType: "photo", includeBase64: true, quality: 0.5, maxHeight: 2016, maxWidth: 2016 },
            (response) => {
              if (response.base64) {
                // console.log("textinpupt photo ... f2");
                // console.log("response.base64 f2", response.base64.length)
                this.onKeyboardItemSelected('f2', { "message": response.base64 });

              }
            }
          );
        },
      },
      {
        text: 'emoticon',
        icon: <SmileIcon />,
        testID: 'f3',
        onPress: () => this.showKeyboardView('ImoticonKeyboardView', 'text'),
      },
    ];
  }


  resetKeyboardView() {
    this.setState({ customKeyboard: {} });
  }

  showKeyboardView(component, title) {
    this.setState({
      keyboardOpenState: true,
      customKeyboard: {
        component,
        initialProps: { title },
      },
    });
  }

  dismissKeyboard() {
    KeyboardUtils.dismiss();
  }

  showLastKeyboard() {
    const { customKeyboard } = this.state;
    this.setState({ customKeyboard: {} });

    setTimeout(() => {
      this.setState({
        keyboardOpenState: true,
        customKeyboard,
      });
    }, 500);
  }

  isCustomKeyboardOpen = () => {
    const { keyboardOpenState, customKeyboard } = this.state;
    return keyboardOpenState && !_.isEmpty(customKeyboard);
  }

  toggleUseSafeArea = () => {
    const { useSafeArea } = this.state;
    this.setState({ useSafeArea: !useSafeArea });

    if (this.isCustomKeyboardOpen()) {
      this.dismissKeyboard();
      this.showLastKeyboard();
    }
  }

  safeAreaSwitchToggle = () => {
    if (!IsIOS) {
      return (<View />);
    }
    const { useSafeArea } = this.state;
    return (
      <View style={styles.safeAreaSwitchContainer}>
        <Text>Safe Area Enabled:</Text>
        <Switch style={styles.switch} value={useSafeArea} onValueChange={this.toggleUseSafeArea} />
      </View>
    );
  }

  keyboardAccessoryViewContent() {
    return (
      <View style={styles.keyboardContainer}>
        <View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb' }} />


        <View style={styles.inputContainer}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {
              this.getToolbarButtonsLeft().map((button, index) =>
                <TouchableOpacity
                  onPress={button.onPress}
                  style={{ paddingLeft: 15, }}
                  key={index}
                  testID={button.testID}
                >
                  {button.icon}
                </TouchableOpacity>)
            }
          </View>

          {this.props.messageType !== "IMAGE" ? (
            <>
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
            </>
          ) : (
            isBase64(this.props.message) === true ?
              (
                <View style={styles.photoInput}>
                  <Image
                    style={{
                      height: 100, width: 100, margin: 10

                    }}
                    source={{ uri: `data:image/jpg;base64,${this.props.message}` }}
                  />
                  <TouchableOpacity
                    style={{
                      height: 20, width: 20,
                      alignItems: 'center', justifyContent: 'center'
                    }}
                    onPress={() => {
                      this.props.setMessage('');
                      this.props.setMessageType('NORMAL');
                    }}
                  >
                    <CancleIcon />
                  </TouchableOpacity>

                </View>
              )
              :
              (
                <View style={styles.photoInput}>
                  <Image
                    style={{
                      height: 100, width: 100
                    }}
                    source={{ uri: this.props.message }}
                  />
                  <TouchableOpacity
                    style={{
                      height: 20, width: 20,
                      alignItems: 'center', justifyContent: 'center'
                    }}
                    onPress={() => {
                      this.props.setMessage('');
                      this.props.setMessageType('NORMAL');
                    }}
                  >
                    <CancleIcon />
                  </TouchableOpacity>

                </View>
              )
          )}


          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {
              this.getToolbarButtonsRight().map((button, index) =>
                <TouchableOpacity
                  onPress={button.onPress}
                  style={{ paddingLeft: 10, paddingRifht: 10 }}
                  key={index}
                  testID={button.testID}
                >
                  {button.icon}
                </TouchableOpacity>)
            }
          </View>


          <TouchableOpacity
            style={styles.sendButton}
            disabled={this.props.message ? false : true}
            onPress={() => {
              this.props.setMessage("");
              this.props.onSubmitEditing(this.props.message, this.props.messageType);
              this.props.setMessageType("NORMAL");
            }}
          >
            <SendArrowIcon />
          </TouchableOpacity>
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
          onHeightChanged={height => this.setState({ keyboardAccessoryViewHeight: IsIOS ? height : undefined })}
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

const COLOR = '#ffffff';

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
  photoInput: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 5,
    backgroundColor: '#EbE9F2',
    borderRadius: 18,
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
    backgroundColor: '#EbE9F2',
    borderRadius: 18,
  },
  sendButton: {
    paddingRight: 5,
    paddingLeft: 10,
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
