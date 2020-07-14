module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            Navigation: "./App/component/Navigation",

            component: "./App/component",
            MainScreen: "./App/component/MainScreen/MainScreen",
            chatScreen: "./App/component/MainScreen/chatScreen",
            chatroomScreen: "./App/component/MainScreen/chatroomScreen",

            MychatScreen: "./App/component/MychatScreen/MychatScreen",
            AlramScreen: "./App/component/AlramScreen",
            style: "./App/themes/campusStyle",
            image: "./App/image",

            assets: "./assets",
            reduxComponent: "./App/reduxSetting/reduxComponent",
            reduxJS: "./App/reduxSetting/redux",
            firebaseConfig: "./App/constant/firebase",
          },
        },
      ],
    ],
  };
};
