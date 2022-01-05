import React, { useState, useEffect } from "react";
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
  Colors,
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

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./Login";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { alignContent, justifyContent, marginTop } from "styled-system";
import BackgroundGradient from "../components/BackgroundGradient";

import { logData } from "./Login";

const { primary, brand, tertiary, darkLight, red } = Colors;

const Agreement = ({ navigation }) => {
  const [isCheckedContract, setIsCheckedContract] = useState(false);
  const [isCheckedTerm, setIsCheckedTerm] = useState(false);
  const [isUserAgreed, setIsUserAgreed] = useState(false);

  const checkAgreement = () => {
    if (isCheckedContract && isCheckedTerm) {
      setIsUserAgreed(true);
      console.log("user agreed");
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Homepage",
          },
        ],
      });
    } else {
      setIsUserAgreed(false);
      alert(
        "Please make sure you have read and undestood the agreement policy."
      );
    }
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <BackgroundGradient></BackgroundGradient>
          <StatusBar style="dark" />
          <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 40 }}>
            <PageHeader>Agreement</PageHeader>
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
                alignSelf: "center",
                justifyContent: "center",
                height: "50%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",

                  width: "95%",
                }}
              >
                <Checkbox
                  accessibilityLabel={"Agree"}
                  isChecked={isCheckedContract}
                  onChange={() => setIsCheckedContract(!isCheckedContract)}
                  size="lg"
                ></Checkbox>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 20, textAlign: "justify" }}>
                    I hereby certifies and agrees to this contract and promises
                    to pay the full amount. I hereby agreed to be paid, the
                    balance, to be paid on every due date. I also further agrees
                    to pay all attorney's fees and court costs in the case of
                    litigation.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  width: "95%",
                }}
              >
                <Checkbox
                  accessibilityLabel={"Agree"}
                  isChecked={isCheckedTerm}
                  onChange={() => setIsCheckedTerm(!isCheckedTerm)}
                  size="lg"
                ></Checkbox>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 20, textAlign: "justify" }}>
                    I agree to the
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "blue",
                      fontSize: 20,
                      textAlign: "justify",
                    }}
                  >
                    Terms and Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                height: 40,
                marginTop: "auto",
                marginBottom: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: brand,
                  justifyContent: "center",
                  borderRadius: 50,
                  marginVertical: 10,
                  alignItems: "center",
                  height: 60,
                  width: "70%",
                  elevation: 5,
                }}
                onPress={checkAgreement}
              >
                <Text style={{ fontSize: 24, color: "white" }}>ACCEPT</Text>
              </TouchableOpacity>
              <Text>© Copyright 2020, DeathCareMS</Text>
            </View>
          </View>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
    </NativeBaseProvider>
  );
};

const MyTextInput = ({ label, icon, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={tertiary} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
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
