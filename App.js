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
const t = createBottomTabNavigator();
const headerDisable = { headerShown: false };
function Nav() {
  return (
    <t.Navigator>
      <t.Screen name="main" component={mainNav} />
      <t.Screen name="mychat" component={mychatNav} />
      <t.Screen name="map" component={mapNav} />
      <t.Screen name="setting" component={settingNav} />
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








