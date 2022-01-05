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
  Alert,
} from "react-native";
import { Formik } from "formik";
import { ButtonText, Line } from "../components/styles";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import { Colors, PageTitle } from "../components/styles";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./Login";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import BackgroundGradient from "../components/BackgroundGradient";

import DateTimePicker from "@react-native-community/datetimepicker";
import * as UserController from "../controller/UserController";

import * as StorageController from "../controller/StorageController";

const { primary, brand, tertiary, darkLight, red } = Colors;

const ResidentialAddress = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dob, setDob] = useState();
  const [customerData, setCustomerData] = useState();
  const [newCustomerData, setNewCustomerData] = useState();
  const [confirmSubmit, setConfirmSubmit] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const uploadData = async ({ uuid, lname, fname, mname, dob, contactNo,  gender, email,landline_no,birthplace,lot_no,street,province,city,barangay,zipcode,occupation, employmentStatus,taxNo, sourceOfFund}) => {
    
    if (customerData) {
      let results = await UserController.updateInformation(
        customerData.uuid,
        lot_no,
        street,
        province,
        city,
        barangay,
        zipcode,
    
      );
      console.log("UPLOAD: ", results);
      if (results) {
        alert("Changes have been submitted.");
        navigation.goBack();
      } else {
        alert("Something went wrong, please try again later.");
      }
    } else {
      console.log("Empty User Data");
    }
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    let uuid = await StorageController.getCurrentUser();
    console.log("UPDT uuid: ", uuid);
    let cust = await UserController.getUserByUuid(uuid);
    console.log("UPDT CSTDATA: ", cust);
    setCustomerData(cust);
  };

  const showAlert = () => {};

  if (!customerData) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <BackgroundGradient></BackgroundGradient>
          <StatusBar style="dark" />
          <View
            style={{
              paddingHorizontal: 30,
              paddingTop: 15,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <PageHeader>RESIDENTIAL ADDRESS</PageHeader>
            <Line></Line>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

            <Formik
              initialValues={{
                lot_no: "",
                street: "",
                province: "",
                city: "",
                barangay: "",
                zipcode: "",
               
              }}

              
              onSubmit={(values) => {
                uploadData(values);
                //alert("TEST");
                // console.log(values);
                // setNewCustomerData(values);
                // console.log("New VALUES", newCustomerData);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <StyledFormArea>
                  <MyTextInput
                    value={values.lot_no}
                    label="Lot #"
                    icon="note"
                    placeholder="Lot #"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("lot_no")}
                    onBlur={handleBlur("lot_no")}
                  />
                  <MyTextInput
                    value={values.street}
                    label="Street"
                    icon="note"
                    placeholder="Street"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("street")}
                    onBlur={handleBlur("street")}
                  />
                  
                  <MyTextInput
                    value={values.province}
                    label="Province"
                    icon="note"
                    placeholder="Province"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("province")}
                    onBlur={handleBlur("province")}
                  />
    
                  <MyTextInput
                    value={values.city}
                    label="City"
                    icon="device-mobile"
                    placeholder="City"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("city")}
                    onBlur={handleBlur("city")}
                  />

                  <MyTextInput
                    value={values.barangay}
                    label="Barangay"
                    icon="device-mobile"
                    placeholder="Barangay"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("barangay")}
                    onBlur={handleBlur("barangay")}
                  />

                  <MyTextInput
                    value={values.zipcode}
                    label="Zip Code"
                    icon="device-mobile"
                    placeholder="Zip Code"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("zipcode")}
                    onBlur={handleBlur("zipcode")}
                  />
                
                
                  <StyledButton
                    onPress={() => {
                      Alert.alert(
                        "Confirm Submission",
                        "Are you sure you want to update your information?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("CANCEL"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: handleSubmit,
                          },
                        ],
                        { cancelable: false }
                      );
                    }}
                  >
                    <ButtonText>Submit</ButtonText>
                  </StyledButton>
                  <StyledButton
                    onPress={() => navigation.navigate("ViewInformation")}
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

const MyTextInput = ({ label, icon, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      {/* <LeftIcon>
        <Octicons name={icon} size={30} color={tertiary} />
      </LeftIcon> */}
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ResidentialAddress;
