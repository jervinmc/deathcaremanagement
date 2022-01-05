import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Colors, Line } from "../components/styles";
import { Octicons } from "@expo/vector-icons";
import { justifyContent, right } from "styled-system";
import { DrawerActions } from "@react-navigation/native";
import { IconContainer } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as UserController from "../controller/UserController";
import * as StorageController from "../controller/StorageController";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { brand, yellow, bgLight, subtitle, dark, green } = Colors;

export function DrawerContent({ navigation, props }) {
  const [customerData, setCustomerData] = useState();

  useEffect(() => {
    getCustomerData();
  }, [JSON.stringify(customerData)]);

  const getCustomerData = async () => {
    let uuid = await StorageController.getCurrentUser();
    let cust = await UserController.getUserByUuid(uuid);
    console.log("DRAWER CSTDATA: ", cust);
    setCustomerData(cust);
  };

  const logOut = async () => {
    try {
      await AsyncStorage.clear();

      console.log("LOGOUT ");
    } catch (e) {
      console.log(e);
    }
  };

  if (!customerData) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bgLight,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
      }}
    >
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            paddingBottom: 20,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text style={styles.appTitle}>Funeraria Se&#241;erez</Text>
          <Text style={styles.appTitle}>de Mesa</Text>
        </View>
        <Line></Line>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-start",
              padding: 10,
              marginHorizontal: 10,
              alignItems: "center",
            }}
          >
            <IconContainer
              backgroundColor={yellow}
              style={{ borderRadius: 30 }}
            >
              <Image
                style={{ width: 60, height: 60, borderRadius: 30 }}
                source={{ uri: customerData.profile_url }}
              ></Image>
            </IconContainer>
            <View
              style={{
                alignItems: "flex-start",
                marginLeft: 20,
              }}
            >
              <Text style={styles.label}>
                {customerData.fname + " " + customerData.lname}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("UpdateProfile")}
              >
                <Text style={styles.labelBold}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Line style={{ marginBottom: 20 }}></Line>
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignContent: "stretch",
            alignItems: "stretch",
          }}
        >
          <View>
          
            <DrawerItem
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              icon={() => <Octicons name={"person"} size={30}></Octicons>}
              label="Manage Account"
              onPress={() => navigation.navigate("ViewInformation")}
            />
            <DrawerItem
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              icon={() => <Octicons name={"unverified"} size={30}></Octicons>}
              label="Contact Us"
              onPress={() => navigation.navigate("ContactUs")}
            />
           
          </View>
          <View>
            <DrawerItem
              labelStyle={styles.drawerLabel}
              style={styles.drawerItemSignOut}
              icon={() => <Octicons name={"sign-out"} size={30}></Octicons>}
              label="Sign Out"
              onPress={() => {
                logOut();
                navigation.dispatch(DrawerActions.closeDrawer());
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: "Login",
                    },
                  ],
                });
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginVertical: 2,
  },

  labelBold: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },

  drawerLabel: {
    fontSize: 20,
    marginLeft: 0,
  },

  drawerItem: {
    backgroundColor: yellow,
    width: "100%",
    height: 60,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    marginHorizontal: 0,
    marginVertical: 0.5,
    elevation: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    flex: 1,
  },

  drawerItemSignOut: {
    backgroundColor: yellow,
    width: "100%",
    height: 60,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    marginHorizontal: 0,
    marginVertical: 0.5,
    elevation: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    flex: 1,
  },

  appTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: brand,
  },
});

export default DrawerContent;
