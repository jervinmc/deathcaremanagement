import AsyncStorage from "@react-native-async-storage/async-storage";

export const setCurrentUser = async (user) => {
  try {
    await AsyncStorage.setItem("current_user", user);
  } catch (e) {
    console.log(e);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await AsyncStorage.getItem("current_user");
    return user;
  } catch (e) {
    console.log(e);
  }
};
