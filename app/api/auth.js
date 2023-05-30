import endpoints from "../constants/endpoints";
import { makeRequest } from "./makeRequest";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export const apiSignIn = async ({ email, password }) => {
  try {
    const response = await makeRequest("POST")(endpoints.signIn)({
      data: {
        email,
        password,
      },
    });
    const token = response.data.token;
    if (!!token) {
      await SecureStore.setItemAsync("authToken", token);
    }

    return response.data;
  } catch (error) {
    return error;
  }
};

export const apiSignUp = async (user) => {
  try {
    const res = await makeRequest("POST")(endpoints.signUp)({
      data: {
        ...user,
      },
    });

    return res.data;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: `${error.message} 👋`,
    });
    return error;
  }
};

export const apiTest = () => makeRequest("GET")(endpoints.test)({});
