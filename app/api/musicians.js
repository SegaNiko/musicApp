import endpoints from "../constants/endpoints";
import { makeRequest } from "./makeRequest";
import * as SecureStore from "expo-secure-store";

export const apiMusicians = async (params) => {
  try {
    const token = await SecureStore.getItemAsync("authToken");

    const response = await makeRequest("GET")(endpoints.musicians)({
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
