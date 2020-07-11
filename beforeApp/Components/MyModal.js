import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';
import {
  Button
} from "react-native-elements";
import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/FontAwesome';
//속성 :
//color = 'red' 버튼 텍스트 색상
//title = 해당 텍스트 출력
//type = solid | ''  / outline / clear / loading
//icon = "아이콘이름" 아이콘 출력
//iconSize = {} 아이콘 크기 정하기 (기본값:24)
//iconColor = '' 아이콘 색상 정하기 (기본값:white)
//backgroundColor = '' 버튼 배경색
//width = {10} 반응형 크기대로 10이면 가로 화면의 10% 크기로 버튼 크기를 정함

//사용예시
//import MyModal from '../Components/MyModal';
//       <MyModal width={60} icon="filter"title="ssww"/>

//p => props
function MyModal (p){
  const color = (p.color == null) ? 'white' : p.color;
  const backgroundColor = (p.backgroundColor == null) ? '#0D3664' : p.backgroundColor;
  const iconSize = (p.iconSize == null) ? 24 : p.iconSize;
  const iconColor = (p.iconColor == null) ? 'white' : p.iconColor;
  const borderRadius = (p.borderRadius == null) ? 10 : p.borderRadius;
  const widthResponsive = (p.width == null) ? 60 : p.width;
const styles = StyleSheet.create({
    buttonStyle:{
    backgroundColor:backgroundColor,
    width:wp(widthResponsive)
    },
    containerStyleDefault:{
        borderRadius: borderRadius,
    },
    containerViewStyleDefault:{
        color:color
    }
})
  if(p.type=='' || p.type==null || p.type=='outline' || p.type=='clear' ||  p.type=='solid'){
    return (
      <Button titleStyle={styles.containerViewStyleDefault} containerStyle={styles.containerStyleDefault} title={p.title} type={p.type} buttonStyle={styles.buttonStyle}  icon={
          <Icon name={p.icon} size={iconSize} color={iconColor}></Icon>
      }></Button>
    );
  }else{
    return (
      <Button title='No Type !' style={styles.default}></Button>
    );
  }
}

export default MyModal; // Don’t forget to use export default!