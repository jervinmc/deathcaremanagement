import React from "react";
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

const { primary, brand, tertiary } = Colors;

const MyAccount = ({navigation}) => {
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
          <PageHeader>My Account</PageHeader>
          <Line></Line>
          <TransparentButton onPress={() => navigation.navigate("UpdateAccount")}>
            <ItemText>Manage Account</ItemText>
            <View style={{ justifyContent: "flex-end", alignItems: "center", alignSelf: "flex-end"}}>
              <Octicons name={"chevron-right"} size={20}></Octicons>
            </View>
          </TransparentButton>
          <TransparentButton onPress={() => navigation.navigate("Login")}>
            <ItemText>Log out</ItemText>
            <View style={{ justifyContent: "flex-end", alignItems: "center", alignSelf: "flex-end"}}>
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

export default MyAccount;
