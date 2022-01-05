import React, { useEffect, useState, useRef } from "react";
import { NativeBaseProvider } from "native-base";
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
import * as Notifications from "expo-notifications";
import { Constants, Permissions } from "expo";
import { DrawerActions } from "@react-navigation/native";
import * as UserController from "../controller/UserController";
import * as StorageController from "../controller/StorageController";
import * as ContributionController from "../controller/ContributionController";
import moment from "moment";

const { primary, brand, tertiary, yellow } = Colors;

const num = [1, 3, 5];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Homepage = ({ navigation }) => {
  const [customer, setCustomer] = useState();
  const [contribution, setContribution] = useState();
  const [totalContributions, setTotalContributions] = useState();
  const [planAmount, setPlanAmount] = useState();
  const [balance, setBalance] = useState();
  const [notified, setNotified] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const dummyContrib = [
    { date: "oct", amount: "100" },
    { date: "nov", amount: "300" },
    { date: "dec", amount: "700" },
  ];

  const computeTotalContribution = () => {
    var x = 0;
    console.log("HOME CTRB: ", contribution);
    for (var k in contribution) {
      console.log(k, " ", contribution[k].amount);
      x += parseFloat(contribution[k].amount);
    }
    console.log("ACAAFDSAFDS", x);
    setTotalContributions(x);
  };

  const computeBalance = () => {
    setBalance(parseFloat(planAmount - totalContributions));
    console.log("BALANCE", balance);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    getUserData();
  }, [JSON.stringify(customer)]);

  useEffect(() => {
    computeTotalContribution();
    checkCurrentMonthContribution();
  }, [contribution]);

  useEffect(() => {
    computeBalance();
  }, [totalContributions]);

  const checkCurrentMonthContribution = () => {
    try {
      let currentDate = new Date();
      let m = moment(currentDate).format("MMMM");
      let y = moment(currentDate).format("yyyy");

      let found = false;

      for (let item of contribution) {
        console.log(item.month + " " + item.year);
        if (item.month === m && item.year === y) {
          found = true;
        }
      }

      if (!found && !notified) {
        notifyCustomer(m, y);
      } else {
        console.log("Contribution for current month is already paid");
      }
    } catch (error) {}
  };

  const notifyCustomer = async (m, y) => {
    setNotified(true);
    console.log("NOTIFY");

    let result = await StorageController.getCurrentUser();
    let cust = await UserController.getUserByUuid(result);

    let reg = moment(cust.date_registered).toDate("MM/DD/yyyy");
    let d = moment(reg).format("DD");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Contribution",
        body:
          "Please pay your contribution for " +
          m + " " + d +
          ", " +
          y +
          ". Discard this notification if you are already paid.",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const getUserData = async () => {
    let result = await StorageController.getCurrentUser();

    let cust = await UserController.getUserByUuid(result);
    let contrib = await ContributionController.getContributions(
      cust.customer_no
    );

    console.log("CUSTNO ", cust.customer_no);
    setPlanAmount(cust.life_plan_amount);

    setCustomer(cust);
    setContribution(contrib);

    console.log("CTRBDTA ", contrib);
  };

  if (!customer || !contribution) return null;
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <BackgroundGradient></BackgroundGradient>
        <StatusBar style="dark-content" />
        <InnerContainer>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
              backgroundColor: "transparent",
              marginTop: -70,
              width: "100%",
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            <View
              style={{
                alignItems: "stretch",
                alignContent: "flex-start",
                justifyContent: "center",
                backgroundColor: "transparent",
                height: 100,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                }}
              >
                Hi!
              </Text>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                }}
              >
                {customer.fname + " " + customer.lname}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "center",
                backgroundColor: "transparent",
              }}
            >
              {/* <HeaderButton onPress={() => navigation.navigate("Notification")}>
                <Octicons name={"bell"} size={35} color={"black"}></Octicons>
              </HeaderButton> */}
              <HeaderButton
                navigation={navigation}
                onPress={() => {
                  console.log("MENU");
                  navigation.dispatch(DrawerActions.openDrawer())
                }}
              >
                <Octicons
                  name={"three-bars"}
                  size={35}
                  color={"black"}
                ></Octicons>
              </HeaderButton>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "transparent",
              height: "25%",
              width: "90%",
            }}
          >
            <TouchableOpacity disabled={true} style={styles.card}>
              <Text style={styles.label}>Total Contribution</Text>
              <Text style={styles.labelCurrency}>₱ {totalContributions}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={true} style={styles.card}>
              <Text style={styles.label}>Balance</Text>
              <Text style={styles.labelCurrency}>₱ {balance}</Text>
            </TouchableOpacity>
          </View>
          <StyledButton
            iconButton={true}
            onPress={() => navigation.navigate("MyContribution")}
          >
            <RoundedIcon
              icon="database"
              backgroundColor="#ff6f00"
            ></RoundedIcon>
            <ButtonText iconButton={true}>My Contribution</ButtonText>
          </StyledButton>
          <StyledButton
            iconButton={true}
            onPress={() => navigation.navigate("ViewPackage")}
          >
            <RoundedIcon
              icon="briefcase"
              backgroundColor="#6a1b9a"
            ></RoundedIcon>
            <ButtonText iconButton={true}>DeathCare Packages</ButtonText>
          </StyledButton>
          <HistoryBar>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>History</Text>
            <View style={styles.historyBar}>
              <ScrollView style={{ width: "100%" }}>
                {contribution.map((item, index) => (
                  <View key={index.toString()} style={styles.item}>
                    <RoundedIcon
                      icon="check"
                      backgroundColor="#ff6f00"
                    ></RoundedIcon>
                    <Text style={styles.itemText}>
                      {item.payment_date.slice(0, 9)}
                    </Text>
                    <Text style={styles.itemText}>{"₱ " + item.amount}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </HistoryBar>
        </InnerContainer>
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
    fontSize: 16,
  },

  labelCurrency: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },

  itemText: {
    fontSize: 16,
  },
});

export default Homepage;
