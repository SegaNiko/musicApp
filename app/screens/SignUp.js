import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Button } from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  CustomDropdown,
  FormContainer,
  FormSelectorButton,
  Input,
  InputPassword,
} from "../components";
import musicalDirection from "../constants/musicalDirection";
import instruments from "../constants/instruments";
import { apiSignUp } from "../api/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const { width } = Dimensions.get("window");

export const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const [musical_direction, setMusicalDirection] = useState("");

  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();

  const bandColors = animation.interpolate({
    inputRange: [0, width],
    outputRange: [COLORS.secondary, COLORS.grey],
  });

  const musicanColors = animation.interpolate({
    inputRange: [0, width],
    outputRange: [COLORS.grey, COLORS.secondary],
  });

  const handleSignUpAcount = () => {
    let user_type;

    if (!!musical_direction) {
      user_type = "band";
    } else if (!!instrument) {
      user_type = "musician";
    }
    const user = {
      name,
      email,
      password,
      confirmPassword,
      user_type,
      instrument,
      musical_direction,
    };

    apiSignUp(user)
      .then((res) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${res.message} 👋`,
        });
        if (res.success) {
          navigation.navigate("SignIn");
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

  const handleDirectionSelect = (value) => {
    setInstrument("");
    setMusicalDirection(value);
  };

  const handleInstrumentsSelect = (value) => {
    setMusicalDirection("");
    setInstrument(value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Toast position="bottom" bottomOffset={20} />

      <KeyboardAwareScrollView>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginVertical: 5,
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
              Create Account
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 8,
              marginHorizontal: 22,
            }}
          >
            <FormSelectorButton
              title="Band"
              backgroundColor={bandColors}
              style={styles.borderLeft}
              onPress={() => scrollView.current.scrollTo({ x: 0 })}
            />
            <FormSelectorButton
              title="Musicain"
              backgroundColor={musicanColors}
              style={styles.borderRight}
              onPress={() => scrollView.current.scrollTo({ x: width })}
            />
          </View>

          <ScrollView
            ref={scrollView}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{
              paddingVertical: 10,
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: animation } } }],
              { useNativeDriver: false }
            )}
          >
            <View
              style={{
                width: Dimensions.get("window").width,
                flex: 1,
              }}
            >
              <CustomDropdown
                data={musicalDirection}
                placeholder="Select musicl direction"
                onSelect={handleDirectionSelect}
                value={musical_direction}
              />
            </View>
            <View
              style={{
                width: Dimensions.get("window").width,
                flex: 1,
              }}
            >
              <CustomDropdown
                data={instruments}
                placeholder="Select instruments"
                onSelect={handleInstrumentsSelect}
                value={instrument}
              />
            </View>
          </ScrollView>
          {/* NAME */}
          <Input
            label="Name"
            placeholder="Enter your name"
            onChange={setName}
          />
          {/* EMAIL */}
          <Input
            label="Email address"
            placeholder="Enter your email address"
            onChange={setEmail}
            keyboardType="email-address"
          />
          {/* PASSWORD */}
          <InputPassword
            onChange={setPassword}
            label="Password"
            placeholder="Enter your password"
          />

          {/* CONFIRM PASSWORD */}
          <InputPassword
            label="Confirm password"
            placeholder="Confirm password"
            onChange={setConfirmPassword}
          />

          <Button
            title="Sign Up"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
              marginHorizontal: 22,
            }}
            onPress={handleSignUpAcount}
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
            <Text style={{ fontSize: 14 }}>Or Sign in with</Text>
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
              Already have an account
            </Text>
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Sign-in
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
