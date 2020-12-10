import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//#region 기본 폰트 설정 fontSize: normalize(24)
import { Dimensions, Platform, PixelRatio } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
//#endregion

//#region 재사용함수
//#endregion
//#region  view
const view = StyleSheet.create({
  default: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  container0: {
    margin: 0,
    padding: 0,
  },
  top5: { margin: 0, marginTop: 5, padding: 0 },
  containerWhite: {
    flex: 1,
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  backgroundColorBlue: {
    backgroundColor: "#0d3664",
  },
  mainHeaderBackground: {
    marginTop: "4%",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  rowflex: {
    flex: 1,
    flexDirection: "row",
  },
  flex: {
    flex: 1,
  },
  rowflexBtnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainItemView: {
    flex: 2.5,
    backgroundColor: "#eaeaea",
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  mainItemTouchItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 6,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 5,
    maxWidth: 300,
    minHeight: 100,
  },
  wideWhite: {
    width: wp(100),
    backgroundColor: "white",
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5,
  },
  createRoomView: {
    position: "absolute",
    bottom: "5%",
    right: "8%",
  },
  circleView: {
    width: 62,
    height: 62,
    borderRadius: 100,
  },
});
//#endregion view
//#region text
const text = StyleSheet.create({
  //#region color 피레트 gray grayDark grayDDark white blue red pink green blueDark yellow orange
  gray: {
    color: "#D2D2D2",
  },
  grayDark: {
    color: "#B7B7BB",
  },
  grayDDark: {
    color: "#3A3A3A",
  },
  white: {
    color: "white",
  },
  blue: {
    color: "#579FEE",
  },
  red: {
    color: "#E74C3C",
  },
  pink: {
    color: "#DE18A3",
  },
  green: {
    color: "#2ECC71",
  },
  blueDark: {
    color: "#172864",
  },
  yellow: {
    color: "#F7FF00",
  },
  orange: {
    color: "#F8BD3C",
  },
  //#endregion

  default: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  middleSize: {
    color: "white",
    fontSize: 18,
  },

  middleBold: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  smallSize: {
    color: "white",
    fontSize: 12,
  },
  smallCenter: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  mainUnivText: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "white",
    borderRadius: 20,
    marginTop: 15,
  },
  whiteInput: {
    fontSize: 13,
    color: "black",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 3,
    marginTop: 8,
    width: wp(80),
  },
  center: {
    textAlign: "center",
    padding: 5,
  },
});
//#endregion text
//#region button
const button = StyleSheet.create({
  default: {
    width: "60%",
    color: "white",
    backgroundColor: "#172864",
  },
  groupActive: {
    flex: 1,
    color: "white",
    padding: 20,
    backgroundColor: "#172864",
    width: 280 / 2,
  },
  groupCancel: {
    flex: 1,
    color: "white",
    padding: 20,
    backgroundColor: "#B7B7BB",
    width: 280 / 2,
  },
  createRoomBtn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 100,
    backgroundColor: "orange",
  },
  marginTopAndBottom5: {
    marginTop: 10,
    marginBottom: 10,
  },
});
//#endregion
//#region image
const image = StyleSheet.create({
  mainImage: {
    transform: [{ translateY: 30 }],
    width: "80%",
    height: 100,
    resizeMode: "contain",
  },
  middleSize: {
    width: 45,
    height: 45,
  },
  middleSizemb10: {
    width: 45,
    height: 45,
    marginBottom: 10,
  },
});
//#endregion
//#region modal
const modal = StyleSheet.create({
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    backgroundColor: "white",
    width: 280,
  },
  container: {
    height: 43,
    marginBottom: 10,
    backgroundColor: "#0D3664",
  },
  component: {
    marginBottom: 30,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
//#endregion
//#region card
const card = StyleSheet.create({});
//#endregion
//#region badge
const badge = StyleSheet.create({
  textStyle: {
    fontSize: 13,
    margin: 3,
  },
});
//#endregion
//#region badge
const icon = StyleSheet.create({
  default: {
    width: 32,
    height: 32,
  },
});
//#endregion
const campusStyle = {
  View: view,
  Text: text,
  Image: image,
  Modal: modal,
  Button: button,
  Badge: badge,
  Card: card,
  Icon: icon,
};
export default campusStyle;
