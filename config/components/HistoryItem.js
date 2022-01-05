import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { IconContainer, Colors } from "../components/styles";
import * as UserController from "../controller/UserController";
import * as StorageController from "../controller/StorageController";
import * as ContributionController from "../controller/ContributionController";

const { primary } = Colors;

const transactionDate = "23 JUN 2021";
const transactionAmount = 500;

const dummyHistory = [
  { date: "oct", amount: "100" },
  { date: "nov", amount: "300" },
  { date: "dec", amount: "700" },
];

export const HistoryItem = ({}) => {
  let [customerData, setCustomerData] = useState();
  let [contributionData, setContributionData] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    let result = await StorageController.getCurrentUser();
    let cust = await UserController.getUserByUuid(result);
    let contrib = await ContributionController.getContributions(
      cust.customer_no
    );
  };

  return (
    <View style={styles.item}>
      <RoundedIcon icon="check" backgroundColor="#ff6f00"></RoundedIcon>
      <Text style={styles.itemText}>{transactionDate}</Text>
      <Text style={styles.itemText}>{"₱ " + transactionAmount}</Text>
    </View>
  );
};

const RoundedIcon = ({ backgroundColor, icon, ...props }) => {
  return (
    <IconContainer
      backgroundColor={backgroundColor}
      style={{ height: 45, width: 45 }}
    >
      <Octicons name={icon} size={40} color={primary} />
    </IconContainer>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },

  itemText: {
    fontSize: 16,
  },

  historyBar: {
    flex: 1,
  },
});

export default HistoryItem;
