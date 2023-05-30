import endpoints from "../constants/endpoints";
import { makeRequest } from "./makeRequest";
import * as SecureStore from "expo-secure-store";

export const apiBands = async (params) => {
  try {
    const token = await SecureStore.getItemAsync("authToken");

    const response = await makeRequest("GET")(endpoints.bands)({
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiTest = async () => {
  const token = await SecureStore.getItemAsync("authToken");
  makeRequest("GET")(endpoints.test)({});
};
