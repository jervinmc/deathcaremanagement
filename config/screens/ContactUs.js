import React, { useState } from "react";
import { Checkbox, NativeBaseProvider } from "native-base";
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
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import { Colors, PageTitle } from "../components/styles";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./Login";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { alignContent, marginTop } from "styled-system";
import BackgroundGradient from "../components/BackgroundGradient";

const { primary, brand, tertiary, darkLight, red } = Colors;

const Agreement = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <BackgroundGradient></BackgroundGradient>
          <StatusBar style="dark" />
          <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 15 }}>
            <PageHeader>Contact Us</PageHeader>
            <Line></Line>
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
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, textAlign: "justify" }}>
                Providing a Life to Remembered.
              </Text>
              <Line></Line>
              <MyInfo
                label={"Email:"}
                value={"demesaronnie@ymail.com"}
              ></MyInfo>
              <Line></Line>
              <MyInfo label={"Phone:"} value={"0949 501 8387"}></MyInfo>
              <Line></Line>
              <MyInfo
                label={"Address:"}
                value={"P. Burgos Street Brgy.2 Calamba City Laguna"}
              ></MyInfo>
              <Line></Line>
            </View>

            <View
              style={{
                height: 40,
                marginTop: "auto",
                marginBottom: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>© Copyright 2020, DeathCareMS</Text>
            </View>
          </View>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
    </NativeBaseProvider>
  );
};

const MyInfo = ({ label, value }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignSelf: "flex-start",
      }}
    >
      <ItemText style={{ fontWeight: "bold" }}>{label}</ItemText>
      <ItemText style={{ marginLeft: 20, marginTop: 10 }}>{value}</ItemText>
    </View>
  );
};

export default Agreement;

// Email:
// demesaronnie@ymail.com

// Phone:
// 0949 501 8387

// Address:
// P. Burgos Street Brgy.2 Calamba City Laguna
