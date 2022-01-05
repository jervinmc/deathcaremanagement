import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { lazy } from "react";
import Login from "../screens/Login";
import MyInformation from "../screens/MyInformation";
import { DrawerContent } from "../components/DrawerContent";
import Homepage from "../screens/Homepage";
import MyPackages from "./../screens/MyPackages";

import { MainStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerPosition={"right"}
      drawerStyle={{
        backgroundColor: "transparent",
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#c6cbef",
          width: 240,
        },
      }}
      initialRouteName={"Homepage"}
    >
      <Drawer.Screen
        name="MainStackNavigator"
        component={MainStackNavigator}
        unmountOnBlur={true}
        options={{ swipeEnabled: false, unmountOnBlur: true }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
