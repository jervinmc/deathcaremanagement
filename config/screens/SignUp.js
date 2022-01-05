import { Formik } from "formik";
import { NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import axios from "axios";
import {
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import {
  StyledContainer,
  InnerContainer,
  SubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  TextLink,
  TextLinkContent,
  Line,
  ExtraView,
  ExtraText
} from "../components/styles";

import { Octicons, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const { darkLight, tertiary } = Colors;

const SignUp = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };
  const signup = async (values) => {
    
    try {
      await axios
        .post("http://3.144.76.35:5000/api/v1/verification", {"email":values.email}).then((res) => {
          results = res.data;
        }); 
  
      // await axios
      //   .post("https://server.deathcaremanagement.online/api/life_plan_customer/add.php", {"email":"jmacalawapersonal@gmail.com"}).then((res) => {
      //     results = res.data;
      //   });
        alert("Successfully Created")
      return results;
      
      
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <SubTitle>Create an Account</SubTitle>

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
              name: "",
              phone: "",
              address: "",
              email: "",
              dateOfBirth: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              console.log(values);

              //online
              console.log("CKK", values.contactNo);
              signup(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  value={values.fName}
                  label="Full Name"
                  icon="person"
                  placeholder="Juan Dela Cruz"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("fName")}
                  onBlur={handleBlur("fName")}
                />
                <MyTextInput
                  value={values.phone}
                  label="Phone"
                  icon="device-mobile"
                  placeholder="+639XXXXXXXXX"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                />
                <MyTextInput
                  value={values.email}
                  label="Email"
                  icon="mail"
                  placeholder="Email"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <MyTextInput
                  value={values.address}
                  label="Address"
                  icon="location"
                  placeholder="Address"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                />
                <MyTextInput
                  value={values.email}
                  label="Email"
                  icon="mail"
                  placeholder="juandelacruz@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                />
                {/* <MyTextInput
                  value={dob ? dob.toDateString() : ''}
                  label="Date of Birth"
                  icon="calendar"
                  placeholder="MM - DD - YY"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("dateOfBirth")}
                  onBlur={handleBlur("dateOfBirth")}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
                /> */}
                <MyTextInput
                  value={values.password}
                  label="Password"
                  icon="key"
                  placeholder="* * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MyTextInput
                  value={values.confirmPassword}
                  label="Confirm Password"
                  icon="key"
                  placeholder="* * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  onChangeText={handleChange("confirmPassword")}
                  secureTextEntry={true}
                />
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Create account</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
            <ExtraView>
              <ExtraText>Already have an account? </ExtraText>
              <TextLink onPress={() => navigation.navigate('Login')}>
                <TextLinkContent>Sign in</TextLinkContent>
              </TextLink>
            </ExtraView>
            <Line></Line>
        </InnerContainer>
      </StyledContainer>
      </KeyboardAvoidingWrapper>
    </NativeBaseProvider>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={tertiary} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={tertiary}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default SignUp;
