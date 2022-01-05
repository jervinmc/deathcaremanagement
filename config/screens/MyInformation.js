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
const { primary, brand, tertiary } = Colors;

const MyInformation = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
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
          <PageHeader>My Information</PageHeader>
          <Line></Line>
          <TransparentButton
            onPress={() => navigation.navigate("ViewInformation")}
          >
            <ItemText>View Information</ItemText>
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
            onPress={() => navigation.navigate("UpdateInformation")}
          >
            <ItemText>Update Information</ItemText>
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
        </InnerContainer>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

const RoundedIcon = ({ backgroundColor, icon, ...props }) => {
  return (
    <IconContainer backgroundColor={backgroundColor}>
      <Octicons name={icon} size={40} color={primary} />
    </IconContainer>
  );
};

export default MyInformation;
