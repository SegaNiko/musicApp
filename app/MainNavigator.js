import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Welcome, SignIn, SignUp, MusicianSearch, BandSearch } from "./screens";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          component={Welcome}
          name="Welcome"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignIn}
          name="SignIn"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignUp}
          name="SignUp"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={MusicianSearch}
          name="MusicianSearch"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={BandSearch}
          name="BandSearch"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
