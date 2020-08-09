import AsyncStorage from "@react-native-community/async-storage";

class Storage {
  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  }

  async getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        alert(value);
      }
    } catch (e) {
      // error reading value
      return null;
      //   alert(value);
    }
  }
}

function getKeys() {
  alert(AsyncStorage.getAllKeys());
}
export default new Storage();
