import React, { Component, useState} from 'react';
import PropTypes from 'prop-types';
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
  Pressable,
  Image,
} from 'react-native';
import {KeyboardRegistry} from 'react-native-keyboard-input';

//각 키보드 레이아웃 화면을 그리는 부분
class KeyboardView extends Component {

  static propTypes = {
    title: PropTypes.string,
  };

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.keyboardContainer, {backgroundColor: 'purple'}]}>
        <Text style={{color: 'white'}}>HELOOOO!!!</Text>
        <Text style={{color: 'white'}}>{this.props.title}</Text>
        <TouchableOpacity
          testID={'click-me'}
          style={{padding: 20, marginTop: 30, backgroundColor: 'white'}}
          onPress={() => this.onButtonPress()}
        >
          <Text>
            Click Me!
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

class AnotherKeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  onButtonPress() {
    KeyboardRegistry.toggleExpandedKeyboard('AnotherKeyboardView');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.keyboardContainer, {backgroundColor: 'orange'}]}>
        <Text>*** ANOTHER ONE ***</Text>
        <Text>{this.props.title}</Text>
        <TouchableOpacity
          testID={'toggle-fs'}
          style={{padding: 20, marginTop: 30, backgroundColor: 'white'}}
          onPress={() => this.onButtonPress()}
        >
          <Text>
            Toggle Full-Screen!
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}


class ImoticonKeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  onButtonPress(emo_url) {
    KeyboardRegistry.onItemSelected('ImoticonKeyboardView', {
      message: emo_url,
    });
  };

  //이모티콘 아이콘 클릭 시 나오는 레이아웃 뷰
  GetOneEmoticon(props){
    return(
      <View>
      <Pressable
        style={{
          height: 100, width: 100
        }}
        onPress={() => { //누르면 해당 이모티콘의 s3 주소를 text에 넣음
          props.object.onButtonPress("https://s3.ap-northeast-2.amazonaws.com/api.campustaxi.net/emoticon/" + props.emo_path +".png");
        }}
        >
        <Image
          style={{
            height: 100, width: 100, position: 'absolute', opacity: true === true ? 1 : 0.3
          }}
          source={{uri: "https://s3.ap-northeast-2.amazonaws.com/api.campustaxi.net/emoticon/"+props.emo_path+".png"}}
        />
      </Pressable>
    </View>
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {
          //각각의 이모티콘을 레이아웃 뷰에 그림
        }
        <View style={{flexDirection: 'row'}}>
          <this.GetOneEmoticon object={this} emo_path="emoticon_taco_1"/>
          <this.GetOneEmoticon object={this} emo_path="emoticon_taco_2"/>
          <this.GetOneEmoticon object={this} emo_path="emoticon_taco_3"/>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

KeyboardRegistry.registerKeyboard('KeyboardView', () => KeyboardView);
KeyboardRegistry.registerKeyboard('AnotherKeyboardView', () => AnotherKeyboardView);
KeyboardRegistry.registerKeyboard('ImoticonKeyboardView', () => ImoticonKeyboardView);
