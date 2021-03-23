import styled from '@emotion/native';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Search } from '../../components/icon/home/Search';
import { GOOGLE_MAPAPI_URL } from '../../constant';
import { myCoordProps } from '../../screens/home/CreateScreen';
type Props = {
  roomType?: number;
  start?: any;
  end?: any;
  setStartState: Dispatch<SetStateAction<myCoordProps>>;
  setEndState: Dispatch<SetStateAction<myCoordProps>>;
  onPressPosSetButton: (
    type: 'start' | 'end' | 'searchStart' | 'searchEnd',
    value: myCoordProps,
    checkvalue: myCoordProps, onPress: Dispatch<SetStateAction<myCoordProps>>,
    searchData?: myCoordProps | undefined) => void;
};

type GooglePlacePros = {
  description?: string;               //"South Korea, Seoul, Nowon-gu, Gongneung-dong, 삼육대학교 대학원"
  matched_substrings?: Array<any>;    //{key: "~", length: "~"}
  place_id?: string;                  //"ChIJd3pMM8e5fDUR8bB3-28TOGY"
  reference?: string;                 //"ChIJd3pMM8e5fDUR8bB3-28TOGY"
  structured_formatting?: { main_text: string, main_text_matched_substrings: Array<any>, secondary_text:string };
                                      //{"main_text": "삼육대학교 대학원", "main_text_matched_substrings": [Array], "secondary_text": "South Korea, Seoul, Nowon-gu, Gongneung-dong"}
  terms?: Array<any>;                 //[[Object], [Object], [Object], [Object], [Object]]
  types?: Array<any>;                 //["university", "university", "point_of_interest", "establishment"]
}
export const MapController: React.FC<Props> = ({
  roomType,
  start,
  end,
  setStartState,
  setEndState,
  onPressPosSetButton,
}) => {
  const StartRef = React.useRef<TextInput>(null);
  const EndRef = React.useRef<TextInput>(null);
  const [startOnFocus, setStartOnFocus] = React.useState<boolean>(false);
  const [endOnFocus, setEndOnFocus] = React.useState<boolean>(false);
  const [searchResult, setSearchResult] = React.useState<Array<GooglePlacePros>>([]);
  const searchLocation = async (text: string, onSearch: Dispatch<SetStateAction<myCoordProps>>, value:myCoordProps) => {
    onSearch({ latitude: value.latitude, longitude: value.longitude, zoom: value.zoom, name: text });
    if (text.length > 1)
      axios.request({
          method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?region=kr&language=ko&input=${text}&rankby=distance&key=${GOOGLE_MAPAPI_URL}`,
        }).then((response) => {
          setSearchResult(response.data.predictions);
        }).catch((e) => console.log(e.response));
    else
      setSearchResult([])
  };
  const onPressBlurView = () => {
    setStartOnFocus(false);
    setEndOnFocus(false);
    if (StartRef)
      StartRef.current.blur()
    if (EndRef)
      EndRef.current.blur()
  }
  const onPressResultText = (d: GooglePlacePros) => {
    if (d.place_id)
      axios.request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${d.place_id}&language=ko&fields=formatted_address,name,geometry&key=${GOOGLE_MAPAPI_URL}`,
      }).then((response) => {
        const d: any = response.data.result;
        if (startOnFocus)
          onPressPosSetButton('searchStart', start, end, setStartState,{
            latitude: d.geometry.location.lat, longitude: d.geometry.location.lng, name: d.formatted_address + "(" + d.name + ")"
          })
        else if (endOnFocus)
          onPressPosSetButton('searchEnd', end,start, setEndState, {
            latitude: d.geometry.location.lat, longitude: d.geometry.location.lng, name: d.formatted_address + "(" + d.name + ")"
          })
        onPressBlurView();
      }).catch((e) => console.log(e.response));
  }
  return (
    <>
      {startOnFocus && searchResult? <ResultStartView>
      {searchResult.slice(0, 4).map((d) =>
        <ResultText key={d.place_id} activeOpacity={0.7} onPress={()=>onPressResultText(d)}>
            <Text>{d.structured_formatting?.main_text}</Text>
          </ResultText>)}
      </ResultStartView> : null}
      {endOnFocus && searchResult? <ResultEndView>
        {searchResult.slice(0, 4).map((d) =>
          <ResultText key={d.place_id} activeOpacity={0.7} onPress={() => onPressResultText(d)}>
              <Text>{d.structured_formatting?.main_text}</Text>
          </ResultText>)}
      </ResultEndView> : null}
      {startOnFocus || endOnFocus ? <BlurView onPress={onPressBlurView}></BlurView> : null}
    <Container>
      <RowTop>
        <Search/>
          <StyledInput
            ref={StartRef}
          returnKeyType={"search"}
          value={start.name}
          onFocus={()=>setStartOnFocus(true)}
          onBlur={()=>setStartOnFocus(false)}
          onChangeText={text => searchLocation(text, setStartState, start)}
          clearButtonMode={"always"}
          underlineColorAndroid="transparent"
          placeholder="출발지를 입력해주세요. (2글자 이상)"
          autoFocus={roomType != 1 ? true : false}
          editable={roomType != 1 ? true : false}
          />
      </RowTop>
      <RowBottom>
          <Search/>
          <StyledInput
            ref={EndRef}
          returnKeyType={"search"}
          value={end.name}
          onFocus={() => setEndOnFocus(true)}
          onBlur={() => setEndOnFocus(false)}
          onChangeText={text => searchLocation(text, setEndState, end)}
          clearButtonMode={"always"}
          underlineColorAndroid="transparent"
          placeholder="도착지를 입력해주세요. (2글자 이상)"
          autoFocus={roomType == 1 ? true : false}
          editable={roomType != 0 ? true : false}
        />
      </RowBottom>
      </Container>
      </>
  );
};
const BlurView = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  background-color:transparent;
  position: absolute;
  z-index:10000;
`
const ResultEndView = styled.View`
  width: 90%;
  top:85px;
  left:5%;
  position: absolute;
  z-index:10001;
  background-color:black;
`
const ResultStartView = styled.View`
  width: 90%;
  top:45px;
  left:5%;
  position: absolute;
  z-index:10001;
`
const ResultText = styled.TouchableOpacity`
  color: rgba(0,0,0,0.51);
  background-color: white;
  padding: 16px 10px 16px 10px;
  border-bottom-width:1px;
  border-color:rgba(112,112,112,0.45);
`
const StyledInput = styled.TextInput`
  font-size: 12px;
  margin: 0 0 0 5px;
  padding: 0;
`
const Container = styled.View`
  background-color: white;
  height: 87px;
  z-index:10000;
`
const RowTop = styled.View`
  height: 35px;
  flex-direction: row;
  margin: 6px 6px 0 6px;
  padding: 0 5px 0 5px;
  background-color: rgba(112,112,112,0.12);
  border-radius: 6px;
  align-items: center;
`
const RowBottom = styled.View`
  height: 35px;
  flex-direction: row;
  margin: 6px 6px 0 6px;
  padding: 0 5px 0 5px;
  background-color: rgba(112,112,112,0.12);
  border-radius: 6px;
  align-items: center;
  `