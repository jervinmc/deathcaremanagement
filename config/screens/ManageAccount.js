import React, { useEffect, useState } from "react";
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
} from "../components/styles";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { ButtonText, Line } from "../components/styles";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import { Colors, PageTitle } from "../components/styles";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./Login";
import BackgroundGradient from "../components/BackgroundGradient";

import * as StorageController from "../controller/StorageController";
import * as UserController from "../controller/UserController";

const { primary, brand, tertiary } = Colors;

const ManageAccount = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <BackgroundGradient></BackgroundGradient>
        <StatusBar style="dark" />
        <View style={{ paddingHorizontal: 30, paddingTop: 15 }}>
          <PageHeader>Update Information</PageHeader>
          <Line></Line>
          <TransparentButton
            onPress={() => navigation.navigate("UpdateMyInformation")}
          >
            <ItemText>Plan Holder's Personal Information</ItemText>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              <Octicons name={"chevron-right"} size={20}></Octicons>
            </View>
          </TransparentButton>
         
          <TransparentButton
            onPress={() => navigation.navigate("UpdateBeneficiary")}
          >
            <ItemText>Beneficiary</ItemText>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              <Octicons name={"chevron-right"} size={20}></Octicons>
            </View>
          </TransparentButton>
          <TransparentButton
            onPress={() => navigation.navigate("UpdatePassword")}
          >
            <ItemText>Change Password</ItemText>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              <Octicons name={"chevron-right"} size={20}></Octicons>
            </View>
          </TransparentButton>
        </View>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default ManageAccount;
