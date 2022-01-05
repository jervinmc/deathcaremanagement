
import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import queryString from 'query-string';
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
  HistoryBar,
  Colors,
  HeaderButton,
  PageHeader,
  Line,
} from "../components/styles";
import {
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { ButtonText } from "./../components/styles";
import { Octicons } from "@expo/vector-icons";
import BackgroundGradient from "../components/BackgroundGradient";
import HistoryItem from "../components/HistoryItem";
import { DrawerActions } from "@react-navigation/native";
import * as UserController from "../controller/UserController";
import * as StorageController from "../controller/StorageController";
import * as ContributionController from "../controller/ContributionController";
import moment from "moment";

const { primary, brand, tertiary, yellow } = Colors;

const month = [1, 2, 3];
const amount = [90, 70, 60];
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
const MyContribution = ({ navigation }) => {
  const [contributionData, setContributionData] = useState();
  const [customerData, setCustomerData] = useState();
  const [day, setDay] = useState("1");
  const [year, setYear] = useState("2021");
  let [totalContributions, setTotalContributions] = useState();

  const dummyContrib = [
    { date: "OCT", amount: "100" },
    { date: "NOV", amount: "300" },
    { date: "DEC", amount: "700" },
  ];

  const computeTotalContribution = () => {
    var x = 0;
    console.log("HOME CTRB: ", contributionData);
    for (var k in contributionData) {
      console.log(k, " ", contributionData[k].amount);
      x += parseFloat(contributionData[k].amount);
    }
    setTotalContributions(x);
  };

  useEffect(() => {
    getContributionData();
  }, []);

  useEffect(() => {
    computeTotalContribution();
  }, [contributionData]);
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
        data:data
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
                "total": totalContributions,
                "currency": "USD",
                "details": {
                  "subtotal": totalContributions
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
                    "price": totalContributions,
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
          data : data
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
 
  const getContributionData = async () => {
    let result = await StorageController.getCurrentUser();
    console.log("MYCTRB result: ", result);
    let cust = await UserController.getUserByUuid(result);
    console.log("MYCTRB cust: ", cust);
    let contrib = await ContributionController.getContributions(
      cust.customer_no
    );
    console.log("MYCTRB contrib: ", contrib);
    setCustomerData(cust);

    let reg = moment(cust.date_registered).toDate("MM/DD/yyyy");
    let registered = moment(reg).format("DD");
    setDay(registered);
    let yr = moment(new Date()).format("yyyy");
    setYear(yr);
    contrib.reverse();
    setContributionData(contrib);
  };

  if (!contributionData || !customerData) {
    return null;
  }
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <BackgroundGradient></BackgroundGradient>
        <StatusBar style="dark" />
        <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <PageHeader>My Contributions</PageHeader>
            <HeaderButton
              navigation={navigation}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Octicons
                name={"three-bars"}
                size={35}
                color={"black"}
              ></Octicons>
            </HeaderButton>
          </View>
          <Line></Line>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              //backgroundColor: "blue",
              height: "25%",
              width: "100%",
            }}
          >
            <TouchableOpacity style={styles.card}>
              <Text style={styles.label}>Total Contribution</Text>
              <Text style={styles.labelCurrency}>₱ {totalContributions}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.label}>Life Plan Amount</Text>
              <Text style={styles.labelCurrency}>
                ₱ {customerData.life_plan_amount}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            {contributionData.map((item, index) => (
              <View key={index.toString()} style={styles.item}>
                <Text>{item.month + " " + day + ", " + year}</Text>
                <Text>{item.amount}</Text>
              </View>
            ))}
            <View style={styles.item}>
              <Text style={{ fontWeight: "bold" }}>Total</Text>
              <Text style={{ fontWeight: "bold" }}>{totalContributions}</Text>
            </View>
            <StyledButton
              style={{
                justifyContent: "center",
                marginLeft: 15,
              }}
              iconButton={true}
              onPress={() => {
                paynow()
              }}
            >

              <ButtonText iconButton={true}
                style={{
                  justifyContent: "center",
                  marginLeft: 0,
                }}>Pay Now</ButtonText>
            </StyledButton>
          </View>

          <View
            style={{
              height: 40,
              marginTop: "auto",
              marginBottom: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>© Copyright 2020, DeathCareMS</Text>
          </View>
        </View>
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

const styles = StyleSheet.create({
  card: {
    width: "47%",
    height: "80%",
    padding: 20,
    backgroundColor: yellow,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    elevation: 10,
  },

  label: {
    fontSize: 14,
  },

  labelCurrency: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },

  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
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
});

export default MyContribution;
