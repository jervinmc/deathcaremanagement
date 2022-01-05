import React from "react";

//Navigation
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

//Components
import { Colors, HeaderButton, StyledButton } from "../components/styles";
import { TouchableOpacity } from "react-native";
import { NativeBaseProvider, View } from "native-base";

//Screens
import Login from "../screens/Login";
import Homepage from "../screens/Homepage";
import MyPackages from "../screens/MyPackages";
import MyAccount from "../screens/MyAccount";
import ViewInformation from "../screens/ViewInformation";
import UpdateMyInformation from "../screens/UpdateMyInformation";
import Agreement from "../screens/Agreement";
import AgreementPayment from "../screens/AgreementPayment";
import ViewPackage from "../screens/ViewPackage";
import ManageAccount from "../screens/ManageAccount";
import Notification from "../screens/Notification";
import MyContribution from "../screens/MyContriibution";
import UpdatePassword from "../screens/UpdatePassword";
import SignUp from "../screens/SignUp";
import UpdateProfile from "../screens/UpdateProfile";
import ContactUs from "../screens/ContactUs";
import ResidentialAddress from "../screens/ResidentialAddress";
import UpdateBeneficiary from "../screens/UpdateBeneficiary";

const { brand, tertiary, primary } = Colors;

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerBackVisible: true,
  headerStyle: { backgroundColor: "yellow" },
  headerTintColor: tertiary,
  headerTransparent: true,
  headerTitle: "",
  headerLeftContainerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 30,
  },
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      navigationOptions={{
        headerLeft: null,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name="Homepage"
        component={Homepage}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen name="MyPackages" component={MyPackages} />
      <Stack.Screen name="Agreement" component={Agreement} />
      <Stack.Screen name="AgreementPayment" component={AgreementPayment} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      <Stack.Screen name="ViewInformation" component={ViewInformation} />
      <Stack.Screen name="ViewPackage" component={ViewPackage} />
      <Stack.Screen name="ManageAccount" component={ManageAccount} />
      <Stack.Screen name="ResidentialAddress" component={ResidentialAddress} />
  
      
      <Stack.Screen
        name="UpdateMyInformation"
        component={UpdateMyInformation}
      />
      <Stack.Screen
        name="UpdateBeneficiary"
        component={UpdateBeneficiary}
      />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="MyContribution" component={MyContribution} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
