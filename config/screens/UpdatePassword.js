import React, { useState, useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import {
  Banner,
  IconContainer,
  InnerContainer,
  StyledButton,
  StyledContainer,
  BannerLogo,
  BannerTitle,
  TransparentButton,
  SimpleButtonText,
  ItemText,
  SubTitle,
  PageHeader,
  RightIcon,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  LeftIcon,
} from "../components/styles";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Formik } from "formik";
import { ButtonText, Line } from "../components/styles";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Colors, PageTitle } from "../components/styles";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./Login";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { BackgroundGradient } from "../components/BackgroundGradient";
import * as UserController from "../controller/UserController";
import * as StorageController from "../controller/StorageController";

const { primary, brand, tertiary, darkLight, red } = Colors;

const UpdatePassword = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    changePassword();
  }, []);

  const changePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
  }) => {
    let uuid = await StorageController.getCurrentUser();

    let cust = await UserController.getUserByUuid(uuid);
    if (cust.password === currentPassword && newPassword === confirmPassword) {
      let result = await UserController.updatePassword(uuid, newPassword);
      console.log("Change Pass: ", result);
      alert("Your password has been changed.");
      navigation.navigate("ViewInformation");
    } else {
      alert("Incorrect password / passwords do not match.");
    }
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <BackgroundGradient></BackgroundGradient>
          <StatusBar style="dark" />
          <View style={{ paddingHorizontal: 30, paddingTop: 15 }}>
            <PageHeader>Change Password</PageHeader>
            <Line></Line>

            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => {
                console.log(values);
                changePassword(values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <StyledFormArea>
                  <MyTextInput
                    value={values.currentPassword}
                    label="Password"
                    icon="key"
                    placeholder="* * * * * *"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("currentPassword")}
                    onBlur={handleBlur("currentPassword")}
                    onChangeText={handleChange("currentPassword")}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />
                  <MyTextInput
                    value={values.newPassword}
                    label="New Password"
                    icon="key"
                    placeholder="* * * * * *"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                    onChangeText={handleChange("newPassword")}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />
                  <MyTextInput
                    value={values.confirmPassword}
                    label="Confirm Password"
                    icon="key"
                    placeholder="* * * * * *"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    onChangeText={handleChange("confirmPassword")}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />

                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Submit</ButtonText>
                  </StyledButton>
                  <StyledButton
                    onPress={() => navigation.navigate("Homepage")}
                    style={{ backgroundColor: red }}
                  >
                    <ButtonText>Cancel</ButtonText>
                  </StyledButton>
                </StyledFormArea>
              )}
            </Formik>
          </View>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
    </NativeBaseProvider>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={tertiary} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={tertiary}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default UpdatePassword;
