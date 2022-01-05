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
  ScrollView,
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
import * as BenefiaryController from "../controller/BeneficiaryController";

const { primary, brand, tertiary, darkLight, red } = Colors;

const UpdateBeneficiary = ({ navigation }) => {
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

  const uploadData = async ({lname, fname, mname, dateOfBirth, relationship, address}) => {
    
    if (customerData) {
     
      let results = await BenefiaryController.addBeneficiary(
        customerData.customer_no,
        lname,
        fname,
        mname,
        dob,
        relationship,
        address,
    
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
      <KeyboardAvoidingWrapper style={{flex: 1}}>
        <View style={{flex: 1}}>
          <BackgroundGradient></BackgroundGradient>
          <StatusBar style="dark" />
          
          <View
            style={{
              flex: 1,
              paddingHorizontal: 30,
              paddingTop: 15,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <PageHeader>PLANHOLDER'S BENEFICIARY INFORMATION</PageHeader>
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
                fname: "",
                mname: "",
                lname: "",
                dateOfBirth: "",
                relationship: "",
                address: "",
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
                    value={values.fname}
                    label="First Name"
                    icon="note"
                    placeholder="First Name"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("fname")}
                    onBlur={handleBlur("fname")}
                  />
                  <MyTextInput
                    value={values.mname}
                    label="Middle Name"
                    icon="note"
                    placeholder="Middle Name"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("mname")}
                    onBlur={handleBlur("mname")}
                  />
                  
                  <MyTextInput
                    value={values.lname}
                    label="Last Name"
                    icon="note"
                    placeholder="Last Name"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("lname")}
                    onBlur={handleBlur("lname")}
                  />
                  
                 
                  <MyTextInput
                    value={dob ? dob.toDateString() : ""}
                    label="Date of Birth"
                    icon="calendar"
                    placeholder="MM - DD - YY"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("dateOfBirth")}
                    onBlur={handleBlur("dateOfBirth")}
                    isDate={true}
                    editable={false}
                    showDatePicker={showDatePicker}
                  />
                  
                  <MyTextInput
                    value={values.contactNo}
                    label="Reletionship"
                    icon="note"
                    placeholder="e.g. Wife"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("relationship")}
                    onBlur={handleBlur("relationship")}
                  />

                  <MyTextInput
                    value={values.email}
                    label="Address"
                    icon="note"
                    placeholder=""
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
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
        </View>
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

export default UpdateBeneficiary;
