import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { HStack, NativeBaseProvider, Checkbox } from "native-base";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  SimpleButton,
  SimpleButtonText,
  SignOptionsView,
  TextLink,
  TextLinkContent,
  Line,
  ExtraView,
  ExtraText,
  Banner,
  BannerLogo,
  BannerTitle,
} from "./../components/styles";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import { Octicons, Ionicons } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import BackgroundGradient from "../components/BackgroundGradient";
import * as UserController from "../controller/UserController";
import * as StorageController from "../controller/StorageController";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const { brand, darkLight, tertiary } = Colors;

//previoous logged users
export const logData = [];

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(true);

  useEffect(() => {
    checkUser();
  },[])
  const signup = async () => {
  
    navigation.navigate("SignUp");

};
  const checkUser = async () => {
    let user = await StorageController.getCurrentUser();

    if(user) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Homepage",
          },
        ],
      });
    }
    else {
      console.log("NO CURRENT USER");
    }
  }


  const checkCredentials = async ({ contactNo, password }) => {
    setIsLoading(true);
    let result = await UserController.getUser(contactNo, password);
    console.log("LGN result: ", result);
    if (result) {
      console.log("LGN result: ", result);
      await StorageController.setCurrentUser(result.uuid);

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Homepage",
          },
        ],
      });
    } else {
      alert("Log in failed.");
    }
    setIsLoading(false);
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <BackgroundGradient></BackgroundGradient>
          <StatusBar style="dark" />

          <View
            style={{
              paddingHorizontal: 30,
              alignItems: "center",
              paddingTop: "15%",
              height: "100%",
            }}
          >
            <Banner>
              <BannerLogo
                resizeMode="cover"
                source={require("./../assets/img/page_logo.png")}
              />
              <BannerTitle
                resizeMode="cover"
                source={require("./../assets/img/page_title.png")}
              />
            </Banner>
            <SubTitle style={{ marginTop: 30, marginBottom: 25 }}>
              LOGIN
            </SubTitle>
            <Formik
              initialValues={{
                contactNo: "",
                password: "",
              }}
              onSubmit={(values) => {
                console.log(values);

                //online
                console.log("CKK", values.contactNo);
                checkCredentials(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                ...props
              }) => (
                <StyledFormArea>
                  <MyTextInput
                    label="Phone Number"
                    icon="device-mobile"
                    placeholder="+639XXXXXXXXX"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("contactNo")}
                    onBlur={handleBlur("contactNo")}
                    value={values.contactNo}
                  />
                  <MyTextInput
                    label="Password"
                    icon="lock"
                    placeholder="* * * * * * *"
                    placeholderTextColor={darkLight}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />
                  <MsgBox>...</MsgBox>
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>LOGIN</ButtonText>
                  </StyledButton>
                  <StyledButton onPress={signup}>
                    <ButtonText>SIGNUP</ButtonText>
                  </StyledButton>
                </StyledFormArea>
              )}
            </Formik>
            <View style={{ flex: 1, marginVertical: 20 }}>
              <ActivityIndicator
                animating={isLoading}
                size="large"
                color={brand}
              />
            </View>
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

const styles = StyleSheet.create({});

export default Login;
