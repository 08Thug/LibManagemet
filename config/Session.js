import AsyncStorage from "@react-native-community/async-storage";
const Session = {
 
  //Methods used to set user name
  setUserName: async (value) => {
    console.log("valued: ", value);
    try {
      await AsyncStorage.setItem("user_name", value);
    } catch (error) {
      // Error saving data
    }
  },
  getUserName: async () => {
    try {
      const value = await AsyncStorage.getItem("user_name");
      return value;
    } catch (error) {
      console.log(error);
    }
  },
  setPassword: async (value) => {
    console.log("valued: ", value);
    try {
      await AsyncStorage.setItem("password", value);
    } catch (error) {
      // Error saving data
    }
  },
  getPassword: async () => {
    try {
      const value = await AsyncStorage.getItem("password");
      return value;
    } catch (error) {
      console.log(error);
    }
  },
};
export default Session;
