import styled from "@emotion/native";
import React, { Dispatch, SetStateAction } from "react";
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
  Coord,
} from "react-native-nmap";
import { Button, Dimensions, InteractionManager } from "react-native";
import { View } from "react-native";
import { ChatRoom } from "../chat-room/ChatRoomList";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type Props = {
  datas: Array<ChatRoom>;
  onTouch: () => void;
  onMapClick: () => void;
  onMakerClick: Dispatch<SetStateAction<any>>;
  selectedMaker?: ChatRoom;
  onCameraChange: Dispatch<SetStateAction<any>>;
  MapRef: React.RefObject<NaverMapView>;
};

export const MapView: React.FC<Props> = ({
  datas,
  onTouch,
  onMapClick,
  onMakerClick,
  selectedMaker,
  onCameraChange,
  MapRef,
}) => {
  return (
    <NaverMapView
      minZoomLevel={12}
      maxZoomLevel={17} //최대 확대
      ref={MapRef}
      style={{ width: "100%", height: windowHeight - 243 }}
      showsMyLocationButton={true}
      onTouch={onTouch}
      onCameraChange={onCameraChange}
      onMapClick={onMapClick}
    >
      {datas.map((data: ChatRoom, i) =>
        data.start_lon != 0.0 && data.start_lat != 0.0 ? (
          <Marker
            key={i + "s"}
            tracksViewChanges={false} //출 -> 도 -> 출 선택하면 에러 뜸 <null pointer> nmap 문제를 해결해줌.
            coordinate={{
              latitude: data.start_lat,
              longitude: data.start_lon,
            }}
            pinColor={data.id == selectedMaker?.id ? "black" : "red"} // 실제폰에서 :   / #39AD4B 에 가까움
            onClick={() => onMakerClick(data)}
          />
        ) : (
          <></>
        )
      )}
      {datas.map((data: ChatRoom, i) =>
        data.end_lat != 0.0 && data.end_lon != 0.0 ? (
          <Marker
            key={"e" + i}
            tracksViewChanges={false} //출 -> 도 -> 출 선택하면 에러 뜸 <null pointer> nmap 문제를 해결해줌.
            coordinate={{ latitude: data.end_lat, longitude: data.end_lon }}
            pinColor={data.id == selectedMaker?.id ? "black" : "blue"} // 실제폰에서 : #42B3EF  / #39AD4B 에 가까움
            onClick={() => onMakerClick(data)}
          />
        ) : (
          <></>
        )
      )}
    </NaverMapView>
  );
};

const MarkerGroup = (coord: any) => (
  <Circle coordinate={coord} radius={200} color="red"></Circle>
);

const MarkerTitle = styled.Text`
  font-size: 10px;
  font-family: bold;
  color: white;
`;

// Dummy Code
{
  /* <MarkerGroup coord={{ latitude: parseInt(datas[0].start_lat), longitude: parseInt(datas[0].start_lon) }} /> */
}
{
  /* <Path coordinates={[P0, P1]} onClick={() => console.log('onClick! path')} width={10} />
    <Polyline coordinates={[P1, P2]} onClick={() => console.log('onClick! polyline')} />
    <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.log('onClick! circle')} />
    <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.log('onClick! polygon')} /> */
}
