import React, { useState, useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import {
  IconContainer,
  StyledButton,
  StyledContainer,
  PageHeader,
} from "../components/styles";
import {
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Image,
  Platform,
} from "react-native";
import { ButtonText, Line } from "../components/styles";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "../components/styles";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { BackgroundGradient } from "../components/BackgroundGradient";

import * as ImagePicker from "expo-image-picker";
import * as UserController from "../controller/UserController";
import * as StorageController from "../controller/StorageController";

const { primary, brand, tertiary, darkLight, red, yellow } = Colors;

const UpdateProfile = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [customerData, setCustomerData] = useState();

  useEffect(() => {
    async function requestAccess() {
      if (Platform.OS === "android") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied");
        }
      }
    }

    requestAccess();
  }, []);

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    let uuid = await StorageController.getCurrentUser();
    let cust = await UserController.getUserByUuid(uuid);

    setCustomerData(cust);
  };

  const uploadImage = async () => {
    let uuid = await StorageController.getCurrentUser();
    let cust = await UserController.getUserByUuid(uuid);

    let localUri = imageUri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);

    let type = match ? `image/${match[1]}` : `image`;

    let image = { uri: localUri, name: filename, type };

    console.log(image);

    let result = await UserController.updateProfilePicture(
      uuid,
      image,
      cust.profile_bucket_name
    );
    if (result) {
      alert("Image successfuly submitted.");
      console.log("yey", result);
    } else {
      alert("Upload unsucessful.");
      console.log(result);
    }
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("not cancelled");
      setImageUri(result.uri);
    }
  };

  const DisplayAvatar = async () => {
    if (imageUri === null) {
      setImage(require("./../assets/img/user.png"));
    }
  };

  if (!customerData) {
    return null;
  }
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <BackgroundGradient></BackgroundGradient>
          <StatusBar style="dark" />
          <View
            style={{
              paddingHorizontal: 30,
              paddingTop: 15,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <PageHeader>Update Avatar</PageHeader>
            <Line></Line>

            <IconContainer
              backgroundColor={yellow}
              style={{
                borderRadius: 100,
                width: 200,
                height: 200,
                alignSelf: "center",
              }}
            >
              <Image
                style={{ width: 200, height: 200, borderRadius: 100 }}
                source={{ uri: customerData.profile_url }}
              ></Image>
            </IconContainer>
            <TouchableOpacity
              onPress={PickImage}
              style={{
                alignSelf: "center",
                marginVertical: 20,
                padding: 5,
                borderRadius: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Octicons name={"pencil"} size={20}></Octicons>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginHorizontal: 10,
                  }}
                >
                  Choose an image
                </Text>
              </View>
            </TouchableOpacity>

            <StyledButton onPress={uploadImage}>
              <ButtonText>Submit</ButtonText>
            </StyledButton>
          </View>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
    </NativeBaseProvider>
  );
};

export default UpdateProfile;
