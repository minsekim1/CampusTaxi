import * as React from 'react';
// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import mainNav from './component/main/nav'
import LoginNav from './component/Login/nav'
import mapNav from './component/map/nav'
import mychatNav from './component/mychat/nav'
import settingNav from './component/setting/nav'
import { AuthContext } from './component/store/UserStore'
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
const t = createBottomTabNavigator();
const headerDisable = { headerShown: false };
function Nav() {
  return (
    <t.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          //아이콘 설정
          let iconName;
          if (route.name === "홈") {
            iconName = focused ? "md-home" : "md-home";
          } else if (route.name === "내 채팅") {
            iconName = focused ? "md-chatboxes" : "md-chatboxes";
          } else if (route.name === "지도") {
            iconName = focused ? "md-map" : "md-map";
            // } else if (route.name === "alarm") {
            //   iconName = focused ? "alarm" : "alarm";
          } else if (route.name === "설정") {
            iconName = focused ? "md-settings" : "md-settings";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <t.Screen name="홈" component={mainNav} />
      <t.Screen name="내 채팅" component={mychatNav} />
      <t.Screen name="지도" component={mapNav} />
      <t.Screen name="설정" component={settingNav} />
    </t.Navigator>
  )
}

const s = createStackNavigator();
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      FontAwesome: require('./assets/fonts/Montserrat.ttf'),
    });

    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) { }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer >
<s.Navigator screenOptions={headerDisable}>
  {state.userToken == null ? (
    <s.Screen name="SignIn" component={LoginNav} />
  ) : (
      <s.Screen name="Home" component={Nav} />
    )}
</s.Navigator>
</NavigationContainer>
    </AuthContext.Provider>
  );
}

//import TestScreen from "./TestScreen"




{/*
      <TestScreen></TestScreen>
    
    */}/*

<AuthContext.Provider value={authContext}>
      <NavigationContainer >
<s.Navigator screenOptions={headerDisable}>
  {state.userToken == null ? (
    <s.Screen name="SignIn" component={LoginNav} />
  ) : (
      <s.Screen name="Home" component={Nav} />
    )}
</s.Navigator>
</NavigationContainer>
    </AuthContext.Provider>
    */