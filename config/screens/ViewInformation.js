import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { StyledContainer, ItemText, PageHeader } from "../components/styles";
import { StatusBar, View, ScrollView,Text } from "react-native";
import { Line, HeaderButton } from "../components/styles";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../components/styles";
import { BackgroundGradient } from "./../components/BackgroundGradient";

import * as UserController from "../controller/UserController";
import * as StorageController from "../controller/StorageController";
import * as BeneficiaryController from "../controller/BeneficiaryController";
import { size } from "styled-system";

const { primary, brand, tertiary, darkLight } = Colors;

const ViewInformation = ({ navigation }) => {
  const [customerData, setCustomerData] = useState();
  const [beneficiaryData, setBeneficiaryData] = useState([]);

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    let uuid = await StorageController.getCurrentUser();
    console.log("VIEWINFO uuid: ", uuid);
    let cust = await UserController.getUserByUuid(uuid);
    console.log("VIEWINFO CSTDATA: ", cust);
    let ben = await BeneficiaryController.getBeneficiaries(cust.customer_no);
    console.log("BENEFICIARY: ", ben);
    setBeneficiaryData(ben);
    setCustomerData(cust);
  };

  if (!customerData) {
    return null;
  }
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <BackgroundGradient></BackgroundGradient>
        <StatusBar style="dark" />
        <ScrollView style={{ paddingHorizontal: 30, paddingTop: 15 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <PageHeader>Planholder's Personal Information</PageHeader>
            <HeaderButton onPress={() => navigation.navigate("ManageAccount")}>
              <Octicons name={"pencil"} size={35} color={"black"}></Octicons>
            </HeaderButton>
          </View>
          <Line></Line>
          <MyInfo label={"ID Number:"} value={customerData.customer_no} />
          <Line></Line>
          <MyInfo
            label={"Full Name:"}
            value={customerData.fname + customerData.mname + customerData.lname}
          />
          <Line></Line>
          <MyInfo label={"Date of Birth:"} value={customerData.date_of_birth} />
          <Line></Line>
          <MyInfo label={"Gender:"} value={customerData.gender} />
          <Line></Line>
          <MyInfo label={"Contact Number:"} value={customerData.contact_no} />
          <Line></Line>
          <MyInfo label={"Email:"} value={customerData.email} />
          <Line></Line>
          <MyInfo label={"Landline No:"} value={customerData.landline_no} />
          <Line></Line>
          <MyInfo label={"Place of Birth:"} value={customerData.birthplace} />
          <Line></Line>


          <SubMenu title={"RESIDENTIAL ADDRESS"}/>
          <Line></Line>
          <MyInfo label={"Lot #:"} value={customerData.lot_no} />
          <Line></Line>
          <MyInfo label={"Street:"} value={customerData.street} />
          <Line></Line>
          <MyInfo label={"Province:"} value={customerData.province} />
          <Line></Line>
          <MyInfo label={"City:"} value={customerData.city} />
          <Line></Line>
          <MyInfo label={"Barangay:"} value={customerData.barangay} />
          <Line></Line>
          <MyInfo label={"Zip Code:"} value={customerData.zipcode} />

          
          <SubMenu title={"EMPLOYMENT"}/>
          <Line></Line>
          <MyInfo label={"Occupatiion:"} value={customerData.occupation} />
          <Line></Line>
          <MyInfo label={"Status of Employment:"} value={customerData.employment_status} />
          <Line></Line>
          <MyInfo label={"Tax Payer's Identification No.:"} value={customerData.tax_no} />
          <Line></Line>
          <MyInfo label={"Source of funds if not employed:"} value={customerData.source_of_fund} />
          <Line></Line>


          <SubMenu title={"BENEFICIARY"}/>
          <Line></Line>
          {
            beneficiaryData.length > 0 ? beneficiaryData.map((item, index) => (
              <View key={index.toString()}>
                <MyInfo label={"First Name:"} value={item.fname} />
                <Line></Line>
                <MyInfo label={"Middle Name:"} value={item.mname} />
                <Line></Line>
                <MyInfo label={"Last Name:"} value={item.lname } />
                <Line></Line>
                <MyInfo label={"Date of Birth:"} value={item.date_of_birth 	} />
                <Line></Line>
                <MyInfo label={"Relationship:"} value={item.relationship} />
                <Line></Line>
                <MyInfo label={"Address:"} value={item.address} />
                <Line></Line>
              </View>
            )) : <MyInfo label={"No Beneficiary"} value="No Beneficiary" />
          }
        
        </ScrollView>
      </StyledContainer>
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
      <ItemText>{label}</ItemText>
      <ItemText style={{ marginLeft: 20, marginTop: 10 }}>{value}</ItemText>
    </View>
  );
};

const SubMenu = ({ title }) => {
  return (
    <View 
      style={{
        flexDirection: "column",
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ marginLeft: 20, marginTop: 24, fontWeight: "bold" , fontSize: 18 }}>  {title}</Text>
    
    </View>
  );
};

export default ViewInformation;
