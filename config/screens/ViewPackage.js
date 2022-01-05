import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Checkbox, RadioButton } from "native-base";
import {
  StyledButton,
  StyledContainer,
  PageHeader,
} from "../components/styles";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { ButtonText, Line, Colors } from "../components/styles";
import BackgroundGradient from "../components/BackgroundGradient";
import { Octicons } from "@expo/vector-icons";
import { borderLeft, fontWeight, textAlign } from "styled-system";

const { primary, brand, tertiary, darkLight, red } = Colors;

const ViewPackage = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);

  const [selectedPackage = [], setSelectedPackage] = useState();
  const [selectedPackageImg, setSelectedPackageImg] = useState([
    require("./../assets/img/package_01.jpg"),
    require("./../assets/img/package_02.jpg"),
    require("./../assets/img/package_03.jpg"),
    require("./../assets/img/package_04.jpg"),
    require("./../assets/img/package_05.jpg"),
    require("./../assets/img/package_06.jpg"),
  ]);

  contributionData = [{ "month": "January", "amount": "2500" }]

  const [pkgIndex = 0, setPkgIndex] = useState();
  useEffect(() => {
    selector(1);
    console.log("useState", selectedPackage);
  }, []);

  useEffect(() => {
    updateListing();
  }, [pkgIndex]);

  const selector = (value) => {
    if (selectedPackage.length === 0) {
      setSelectedPackage(packageOffers[0]);
      console.log("EMPTY");
    } else {
      if (value === 1) {
        if (pkgIndex === packageOffers.length - 1) {
          setPkgIndex(0);
          console.log("+ reset:", pkgIndex);
        } else {
          setPkgIndex(pkgIndex + value);
          console.log("+ : ", pkgIndex);
        }
      } else {
        if (pkgIndex === 0) {
          setPkgIndex(packageOffers.length - 1);
          console.log("- reset:", pkgIndex);
        } else {
          setPkgIndex(pkgIndex + value);
        }
      }
    }
  };

  const updateListing = async () => {
    setSelectedPackage(packageOffers[pkgIndex]);
  };
  const proceed = async () => {

    navigation.navigate("AgreementPayment");

  };
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <BackgroundGradient></BackgroundGradient>
        <StatusBar style="dark" />
        <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 15 }}>
          <PageHeader>Package Details</PageHeader>
          <Text style={styles.titleText}>Package {pkgIndex + 1}</Text>
          <View style={{}}>
            <ImageBackground
              style={styles.image}
              source={selectedPackageImg[pkgIndex]}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => selector(-1)}>
                  <Octicons
                    name="chevron-left"
                    color="white"
                    size={60}
                  ></Octicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selector(1)}>
                  <Octicons
                    name="chevron-right"
                    color="white"
                    size={60}
                  ></Octicons>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <ScrollView style={{ flex: 1, width: "100%", marginVertical: 10 }}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {selectedPackage.map((item, i) => (
                <View key={i.toString()}>
                  <Text style={{ fontSize: 20 }}>- {item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.container}>
              <View style={styles.item}>
                <Checkbox
                  accessibilityLabel={""}
                  size="lg"
                ></Checkbox>
                <Text>Anually</Text>
                <Text>7500</Text>
              </View>
              <View style={styles.item}>
                <Checkbox
                  accessibilityLabel={""}
                  size="lg"
                ></Checkbox>
                <Text>Semi Annually</Text>
                <Text>5500</Text>
              </View>
              <View style={styles.item}>
                <Checkbox
                  accessibilityLabel={""}
                  size="lg"
                ></Checkbox>
                <Text>Quarterly</Text>
                <Text>3500</Text>
              </View>
              <View style={styles.item}>
                <Checkbox
                  accessibilityLabel={""}
                  size="lg"
                ></Checkbox>
                <Text>Monthly</Text>
                <Text>1500</Text>
              </View>
            </View>
          </ScrollView>

          {/* <StyledButton
            onPress={() => navigation.navigate("Agreement")}
            style={{
              width: "100%",
            }}
          >
            <ButtonText>Proceed</ButtonText>
          </StyledButton> */}
        </View>
      </StyledContainer>
      <StyledButton
        style={{
          justifyContent: "center",
          marginLeft: 15,
        }}
        iconButton={true}
        onPress={() => {
          proceed()
        }}
      >
        <ButtonText iconButton={true}
          style={{
            justifyContent: "center",
            marginLeft: 0,
          }}>Proceed</ButtonText>
      </StyledButton>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    width: "100%", // is 50% of container width
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
});

const packageOffers = [
  [
    "Php 35,000 Package 1",
    "Ordinary Casket",
    "Viewing Equipment (Funeral Setup)",
    "Embalming Process",
    "Simple Flower Arrangement",
    "Curtain - Kawayan Backdrop",
    "5 Gallons of Water",
    "4x Candles",
    "1 2x3 Tarpaulin",
    "1 8x10 Picture Frame Interment",
    "Funeral Hearse (Mercedez Benz)",
    "1 Van for Viewing Equipment",
    "15pcs White Balloons",
    "2 dozen White Roses",
    "Uniformed Staffs",
  ],
  [
    "Php 50,000 Package 2",
    "Ordinary Casket",
    "Viewing Equipment (Funeral Setup)",
    "Embalming Process",
    "Garden Set Flower Arrangement",
    "Encantadia Curtain / Kawayan Backdrop",
    "5 Gallons of Water",
    "2 2x3 Tarpaulin",
    "1 11x14 Picture Frame Interment",
    "Karwahe & Flower Car",
    "1 Van for Viewing Equipment",
    "15pcs White Balloons",
    "2 dozen White Roses",
    "60pcs Bottled Water",
    "Uniformed Staffs",
  ],
  [
    "Php 80,000 Package 3 (Metal Casket",
    "Jr. de Barra Handle Casket (Wooden/Metal)",
    "Viewing Equipment for Funeral Setup",
    "Garden Flower Set Arrangement",
    "Curtain/Kawayan Backdrop",
    "10 gallons of Water",
    "2 2x3 Tarpauling",
    "1 1x14 Picture Frame",
    "Carruaje with Flower Car",
    "1 Van for Viewing Equipment",
    "20pcs White Balloons",
    "4 dozen White Roses",
    "100 pcs Bottled Water",
    "20 pcs Thank You Cards",
    "Uniformed Staffs",
  ],
  [
    "Php 80,000 Package 4 (Metal Casket",
    "Jr. de Barra Handle Casket (Wooden/Metal)",
    "Viewing Equipment for Funeral Setup",
    "Garden Flower Set Arrangement",
    "Curtain/Kawayan Backdrop",
    "10 gallons of Water",
    "2 2x3 Tarpauling",
    "1 1x14 Picture Frame",
    "Carruaje with Flower Car",
    "1 Van for Viewing Equipment",
    "20pcs White Balloons",
    "4 dozen White Roses",
    "100 pcs Bottled Water",
    "20 pcs Thank You Cards",
    "Uniformed Staffs",
  ],
  [
    "Php 120,000 Package 5",
    "Bubble Top Casket Wood",
    "Viewing Equipment for Funeral Setup",
    "Embalming Process",
    "Garden Set Flower",
    "Curtain/Kawayan Backdrop",
    "Unlimited Candles during Viewing",
    "10 gallons of Water",
    "2 2x3 Tarpauling",
    "1 12x16 Picture Frame",
    "With Eulogy (Huling Lamay)",
    "Includes Choir and AVP",
    "Interment:",
    "Carruaje with Flower Car",
    "1 Van for Viewing Equipment",
    "20pcs White Balloons",
    "4 dozen White Roses",
    "100 Pcs Bottled Water",
    "100 pcs Mamon",
    "30 pcs Thank You Cards",
    "Uniformed Staffs",
  ],
  [
    "Php 150,000 Package 6",
    "Bubble Top (Metal Casket)",
    "Viewing Equipment for Funeral Setup",
    "Embalming Process",
    "Garden Set Flower",
    "Curtain/Kawayan Backdrop",
    "Unlimited Candles during Viewing",
    "10 gallons of Water",
    "2 2x3 Tarpauling",
    "1 12x16 Picture Frame",
    "With Eulogy (Huling Lamay)",
    "Includes Choir and AVP",
    "Interment:",
    "Carruaje Kabayo Flower Car",
    "1 Van for Viewing Equipment",
    "20pcs White Balloons",
    "4 dozen White Roses",
    "100 Pcs Bottled Water",
    "100 pcs Mamon",
    "30 pcs Thank You Cards",
    "Uniformed Staffs",
  ],
];

export default ViewPackage;
