import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Button } from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Input, InputPassword } from "../components";

import { apiSignIn } from "../api/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitSingIn = () => {
    apiSignIn({ email, password })
      .then((res) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${res.message} 👋`,
        });
        if (res?.success) {
          const { user_type } = res.user;
          if (!!user_type && user_type === "band") {
            navigation.navigate("MusicianSearch");
          } else {
            navigation.navigate("BandSearch");
          }
        }
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${err.message} 👋`,
        });
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Toast position="bottom" bottomOffset={20} />
      <KeyboardAwareScrollView>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginVertical: 22,
              marginHorizontal: 22,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 10,
                color: COLORS.black,
              }}
            >
              Hey Welcome back
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Hello again you have been missed!
            </Text>
          </View>

          {/* EMAIL */}
          <Input
            label="Email address"
            placeholder="Enter your email address"
            onChange={setEmail}
            keyboardType="email-address"
          />

          {/* PASSWORD */}
          <InputPassword
            label="Password"
            placeholder="Enter your password"
            onChange={setPassword}
          />

          <Button
            title="Sign in"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
              marginHorizontal: 22,
            }}
            onPress={handleSubmitSingIn}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
            <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Don't have account? Let's create it
            </Text>
            <Pressable onPress={() => navigation.navigate("SignUp")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Sign-up
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
