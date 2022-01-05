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

const { primary, brand, tertiary, darkLight, red } = Colors;

const UpdateMyInformation = ({ navigation }) => {
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
        lname,
        fname,
        mname,
        dob,
        contactNo,
        gender,
        email,
        landline_no,
        birthplace,
        lot_no,
        street,
        province,
        city,
        barangay,
        zipcode,
        occupation,
        employmentStatus,
        taxNo,
        sourceOfFund,
    
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
            <PageHeader>PLANHOLDER'S PERSONAL INFORMATION</PageHeader>
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
                contactNo: "",
                gender: "",
                email: "",
                landline_no: "",
                birthplace: "",
                lot_no: "",
                street: "",
                province: "",
                city: "",
                barangay: "",
                zipcode: "",
                occupation: "",
                employmentStatus: "",
                taxNo: "",
                sourceOfFund: "",
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
                    value={values.gender}
                    label="Gender"
                    icon="device-mobile"
                    placeholder="Gender"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("gender")}
                    onBlur={handleBlur("gender")}
                  />
                  
                  <MyTextInput
                    value={values.contactNo}
                    label="Contact Number"
                    icon="device-mobile"
                    placeholder="+639XXXXXXXXX"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("contactNo")}
                    onBlur={handleBlur("contactNo")}
                  />
                    <MyTextInput
                    value={values.email}
                    label="Email"
                    icon="device-mobile"
                    placeholder="@gmail.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                   <MyTextInput
                    value={values.landline_no}
                    label="Landline No."
                    icon="device-mobile"
                    placeholder="XXXXXX"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("landline_no")}
                    onBlur={handleBlur("landline_no")}
                  />
                   <MyTextInput
                    value={values.birthplace}
                    label="Place of Birth"
                    icon="device-mobile"
                    placeholder="Place of Birth"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("birthplace")}
                    onBlur={handleBlur("birthplace")}
                  />
                   <MyTextInput
                    value={values.lot_no}
                    label="Lot #"
                    icon="device-mobile"
                    placeholder="Lot #"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("lot_no")}
                    onBlur={handleBlur("lot_no")}
                  />
                   <MyTextInput
                    value={values.street}
                    label="Street"
                    icon="device-mobile"
                    placeholder="Street"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("street")}
                    onBlur={handleBlur("street")}
                  />
                   <MyTextInput
                    value={values.province}
                    label="Province"
                    icon="device-mobile"
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

                   <MyTextInput
                    value={values.occupation}
                    label="Occupation"
                    icon="device-mobile"
                    placeholder="Occupation"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("occupation")}
                    onBlur={handleBlur("occupation")}
                  />
                  <MyTextInput
                    value={values.employmentStatus}
                    label="Status of Employment"
                    icon="device-mobile"
                    placeholder="Status of Employment"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("employmentStatus")}
                    onBlur={handleBlur("employmentStatus")}
                  />

                  <MyTextInput
                    value={values.taxNo}
                    label="TAX Payer's Identification No."
                    icon="device-mobile"
                    placeholder="XXXXXXX"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("taxNo")}
                    onBlur={handleBlur("taxNo")}
                  />
                   <MyTextInput
                    value={values.sourceOfFund}
                    label="Source of funds if not employed"
                    icon="device-mobile"
                    placeholder="Source of funds if not employed"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("sourceOfFund")}
                    onBlur={handleBlur("sourceOfFund")}
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

export default UpdateMyInformation;
