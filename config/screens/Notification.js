import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import {
  IconContainer,
  StyledContainer,
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
import { Octicons } from "@expo/vector-icons";
import BackgroundGradient from "../components/BackgroundGradient";
import HistoryItem from "../components/HistoryItem";
import { DrawerActions } from "@react-navigation/native";
import { backgroundRepeat } from "styled-system";
import * as StorageController from "../controller/StorageController";
import * as UserController from "../controller/UserController";
import * as ContributionController from "../controller/ContributionController";

const { primary, brand, tertiary, yellow } = Colors;

const Notification = ({ navigation }) => {
  const [contributionData, setContributionData] = useState();
  const [customer, setCustomer] = useState();
  let [totalContributions, setTotalContributions] = useState();
  let [balance, setBalance] = useState();
  let [planAmount, setPlanAmount] = useState();

  const addNotification = () => {
    if (balance > 0)
      return (
        <NotificationItem
          icon="inbox"
          msg={
            "Hi we would like to remind about your unpaid balance amounting to Php " +
            balance +
            " will overdue. According to your terms, we suggest paying from this moment"
          }
          date="-DeathCareMS"
        ></NotificationItem>
      );
  };

  //${balance}
  //"Hi we would like to remind about your unpaid balance amounting to Php" +  + " will overdue. According to your terms, we suggest paying from this moment"

  const computeTotalContribution = () => {
    var x = 0;
    console.log("HOME CTRB: ", contributionData);
    for (var k in contributionData) {
      console.log(k, " ", contributionData[k].amount);
      x += parseFloat(contributionData[k].amount);
    }
    setTotalContributions(x);
  };

  const computeBalance = () => {
    setBalance(parseFloat(planAmount - totalContributions));
    console.log("planAmount", planAmount);
    console.log("totalCtrb", totalContributions);
    console.log("BALANCE", balance);
  };

  const getContributionData = async () => {
    let uuid = await StorageController.getCurrentUser();
    let cust = await UserController.getUserByUuid(uuid);
    let contrib = await ContributionController.getContributions(
      cust.customer_no
    );
    setCustomer(cust);
    setPlanAmount(cust.life_plan_amount);
    setContributionData(contrib);
  };

  useEffect(() => {
    getContributionData();
  }, []);

  useEffect(() => {
    computeTotalContribution();
  }, [contributionData]);

  useEffect(() => {
    computeBalance();
  }, [totalContributions]);

  if (!customer || !contributionData) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <StyledContainer>
        <BackgroundGradient></BackgroundGradient>
        <StatusBar style="dark" />
        <View style={{ paddingHorizontal: 30, paddingTop: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <PageHeader> Notifications</PageHeader>
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
          {addNotification()}
          <NotificationItem
            msg={"Welcome to DeathCare Life Plan App. Thank you for joining"}
            date={customer.date_registered}
          ></NotificationItem>
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

const NotificationItem = ({
  icon = "megaphone",
  msg = "",
  date = "",
  ...props
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          backgroundColor: "transparent",
          alignItems: "center",
        }}
      >
        <Octicons name={icon} size={40} color={brand}></Octicons>
        <View
          style={{
            marginLeft: 20,
            paddingVertical: 10,
          }}
        >
          <Text style={styles.label}>{msg}</Text>
          <Text>{date}</Text>
        </View>
      </View>
      <Line></Line>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "45%",
    height: 140,
    padding: 20,
    backgroundColor: yellow,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    elevation: 10,
  },

  label: {
    fontSize: 18,
    paddingVertical: 5,
  },

  labelCurrency: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Notification;
