import React, { useState, useEffect } from "react";
import { Checkbox, NativeBaseProvider } from "native-base";
import { Linking } from "react-native";
import axios from "axios";
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
  Colors,
} from "../components/styles";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Formik } from "formik";
import { ButtonText, Line } from "../components/styles";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./Login";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { alignContent, justifyContent, marginTop } from "styled-system";
import BackgroundGradient from "../components/BackgroundGradient";

import { logData } from "./Login";

const { primary, brand, tertiary, darkLight, red } = Colors;

const Agreement = ({ navigation }) => {
  const [isCheckedContract, setIsCheckedContract] = useState(false);
  const [isCheckedTerm, setIsCheckedTerm] = useState(false);
  const [isUserAgreed, setIsUserAgreed] = useState(false);

  const checkAgreement = () => {
    if (isCheckedContract && isCheckedTerm) {
      setIsUserAgreed(true);
      console.log("user agreed");
      paynow()
    } else {
      setIsUserAgreed(false);
      alert(
        "Please make sure you have read and undestood the agreement policy."
      );
    }
  };
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
  const paynow = async () => {

    try {

      var data = 'grant_type=client_credentials'
      var config = {
        method: "post",
        url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        headers: {
          Authorization:
            "Basic QWZoa1BDVUZubXlvZnV3TjNPU2ljTzdaODNnS29YbERVbWJhN21laDNHZXd2QjZlQzFuUTc0SnJNQ1NBTnBZeVV1ZHlqRXZaQm9kYS01cS06RUZtREUweVdxcW95VE42THVMZ0Y3V24wajJpWkdxOGdTa1NPR3phTmxmSEtaeTJ1cGwyRmticmlGbGdrNTVfU0dtRlN2SVZnbVZmOWNYZGs=",
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie:
            "cookie_prefs=P%3D1%2CF%3D1%2Ctype%3Dimplicit; enforce_policy=ccpa; ts=vreXpYrS%3D1734306076%26vteXpYrS%3D1639637099%26vt%3Dc1e12b5717dac1200018c0cefffffb00%26vr%3Dc1e12b5717dac1200018c0cefffffaff; ts_c=vr%3Dc1e12b5717dac1200018c0cefffffaff%26vt%3Dc1e12b5717dac1200018c0cefffffb00",
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          var res = response.data;
          var data = JSON.stringify({
            "intent": "sale",
            "payer": {
              "payment_method": "paypal"
            },
            "transactions": [
              {
                "amount": {
                  "total": "7500",
                  "currency": "USD",
                  "details": {
                    "subtotal": "7500"
                  }
                },
                "description": "This is the payment transaction description.",
                "custom": "EBAY_EMS_90048630024435",
                "invoice_number": makeid(5),
                "payment_options": {
                  "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                },
                "soft_descriptor": "ECHI5786786",
                "item_list": {
                  "items": [
                    {
                      "name": "handbag",
                      "description": "Black color hand bag",
                      "quantity": "1",
                      "price": "7500",
                      "sku": "product34",
                      "currency": "USD"
                    }
                  ],
                  "shipping_address": {
                    "recipient_name": "DeathCareManagement",
                    "line1": "4thFloor",
                    "line2": "unit#34",
                    "city": "SAn Jose",
                    "country_code": "US",
                    "postal_code": "95131",
                    "phone": "011862212345678",
                    "state": "CA"
                  }
                }
              }
            ],
            "note_to_payer": "Contact us for any questions on your order.",
            "redirect_urls": {
              "return_url": "http://3.144.76.35:5000/api/v1/payment",
              "cancel_url": "https://example.com"
            }
          });

          var config = {
            method: 'post',
            url: 'https://api-m.sandbox.paypal.com/v1/payments/payment',
            headers: {
              'Authorization': `Bearer ${res.access_token}`,
              'Content-Type': 'application/json',
              'Cookie': 'cookie_prefs=P%3D1%2CF%3D1%2Ctype%3Dimplicit; enforce_policy=ccpa; ts=vreXpYrS%3D1734306076%26vteXpYrS%3D1639637099%26vt%3Dc1e12b5717dac1200018c0cefffffb00%26vr%3Dc1e12b5717dac1200018c0cefffffaff; ts_c=vr%3Dc1e12b5717dac1200018c0cefffffaff%26vt%3Dc1e12b5717dac1200018c0cefffffb00; tsrce=devdiscoverynodeweb'
            },
            data: data
          };

          axios(config)
            .then(function (response) {
              var res = response.data;
              console.log(res.links[1].href)

              Linking.openURL(res.links[1].href).catch(err => console.error("Couldn't load page", err));
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });


    } catch (error) {
      console.log(error)

    }

    // console.log(res)
  }
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <BackgroundGradient></BackgroundGradient>
          <StatusBar style="dark" />
          <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 40 }}>
            <PageHeader>Agreement</PageHeader>
            <Line></Line>
            {/* <Banner>
              <BannerLogo
                resizeMode="cover"
                source={require("./../assets/img/page_logo.png")}
              />
              <BannerTitle
                resizeMode="cover"
                source={require("./../assets/img/page_title.png")}
              />
            </Banner> */}
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                height: "50%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",

                  width: "95%",
                }}
              >
                <Checkbox
                  accessibilityLabel={"Agree"}
                  isChecked={isCheckedContract}
                  onChange={() => setIsCheckedContract(!isCheckedContract)}
                  size="lg"
                ></Checkbox>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 20, textAlign: "justify" }}>
                    I hereby certifies and agrees to this contract and promises
                    to pay the full amount. I hereby agreed to be paid, the
                    balance, to be paid on every due date. I also further agrees
                    to pay all attorney's fees and court costs in the case of
                    litigation.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  width: "95%",
                }}
              >
                <Checkbox
                  accessibilityLabel={"Agree"}
                  isChecked={isCheckedTerm}
                  onChange={() => setIsCheckedTerm(!isCheckedTerm)}
                  size="lg"
                ></Checkbox>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 20, textAlign: "justify" }}>
                    I agree to the
                    In consideration of the terms stipulated herein, the PLANHOLDER shall
                    pay the Gross Contract Price in the manner stated in this Contract.
                    Payments due shall be paid.
                    When the PLANHOUDER does not pay for 30 days, it has a 3% penalty.
                    The PLANHOUDER is given a grace period of sixty (60) days from the due
                  </Text>
                </View>
                {/* <TouchableOpacity >

                  <Text
                    style={{
                      color: "blue",
                      fontSize: 20,
                      textAlign: "justify",
                    }}
                  >
                    Terms and Conditions
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>

            <View
              style={{
                height: 40,
                marginTop: "auto",
                marginBottom: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: brand,
                  justifyContent: "center",
                  borderRadius: 50,
                  marginVertical: 10,
                  alignItems: "center",
                  height: 60,
                  width: "70%",
                  elevation: 5,
                }}
                onPress={checkAgreement}
              >
                <Text style={{ fontSize: 24, color: "white" }}>Pay Now</Text>
              </TouchableOpacity>
              <Text>© Copyright 2020, DeathCareMS</Text>
            </View>
          </View>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
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

export default Agreement;

// Email:
// demesaronnie@ymail.com

// Phone:
// 0949 501 8387

// Address:
// P. Burgos Street Brgy.2 Calamba City Laguna
