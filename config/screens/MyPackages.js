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
  Card,
  CardImage,
  CardText,
  CardButton,
} from "../components/styles";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { ButtonText, Line } from "../components/styles";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import { Colors, PageTitle } from "../components/styles";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./Login";
import BackgroundGradient from "../components/BackgroundGradient";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const { primary, brand, tertiary, darkLight, red } = Colors;

const MyPackages = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <BackgroundGradient></BackgroundGradient>
        <StatusBar style="dark" />
        <View style={{ paddingHorizontal: 30, paddingTop: 15 }}>
          <PageHeader>Offer Packages</PageHeader>
          <Line></Line>
          <ScrollView style={{ width: "100%" }}>
            <View
              style={{
                alignSelf: "flex-start",
                flexDirection: "column",
                width: "100%",
                paddingBottom: 100,
              }}
            >
              <Card>
                <CardButton
                  onPress={() =>
                    navigation.navigate("ViewPackage", {
                      screen: "ViewPackage",
                      params: { pkgIndex: 0 },
                    })
                  }
                >
                  <CardText>Package 1</CardText>
                  <Octicons
                    name={"chevron-right"}
                    size={25}
                    color={"black"}
                  ></Octicons>
                </CardButton>
                <Image
                  style={styles.cardImage}
                  source={require("./../assets/img/package_01.jpg")}
                ></Image>
              </Card>
              <Card>
                <CardButton
                  onPress={() =>
                    navigation.navigate("ViewPackage", {
                      screen: "Homepage",
                      params: { pkgIndex: 1 },
                    })
                  }
                >
                  <CardText>Package 2</CardText>
                  <Octicons
                    name={"chevron-right"}
                    size={25}
                    color={"black"}
                  ></Octicons>
                </CardButton>
                <Image
                  style={styles.cardImage}
                  source={require("./../assets/img/package_02.jpg")}
                ></Image>
              </Card>
              <Card>
                <CardButton
                  onPress={() =>
                    navigation.navigate("ViewPackage", {
                      screen: "ViewPackage",
                      params: { pkgIndex: 2 },
                    })
                  }
                >
                  <CardText>Package 3</CardText>
                  <Octicons
                    name={"chevron-right"}
                    size={25}
                    color={"black"}
                  ></Octicons>
                </CardButton>
                <Image
                  style={styles.cardImage}
                  source={require("./../assets/img/package_03.jpg")}
                ></Image>
              </Card>
              <Card>
                <CardButton>
                  <CardText>Package 4</CardText>
                  <Octicons
                    name={"chevron-right"}
                    size={25}
                    color={"black"}
                  ></Octicons>
                </CardButton>
                <Image
                  style={styles.cardImage}
                  source={require("./../assets/img/package_04.jpg")}
                ></Image>
              </Card>
              <Card>
                <CardButton>
                  <CardText>Package 5</CardText>
                  <Octicons
                    name={"chevron-right"}
                    size={25}
                    color={"black"}
                  ></Octicons>
                </CardButton>
                <Image
                  style={styles.cardImage}
                  source={require("./../assets/img/package_05.jpg")}
                ></Image>
              </Card>
              <Card>
                <CardButton>
                  <CardText>Package 6</CardText>
                  <Octicons
                    name={"chevron-right"}
                    size={25}
                    color={"black"}
                  ></Octicons>
                </CardButton>
                <Image
                  style={styles.cardImage}
                  source={require("./../assets/img/package_06.jpg")}
                ></Image>
              </Card>
            </View>
          </ScrollView>
        </View>
      </StyledContainer>
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

const styles = StyleSheet.create({
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default MyPackages;
