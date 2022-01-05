import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";

export const BackgroundGradient = ({}) => {
  return (
    <LinearGradient
      start={[0, 1]}
      end={[1, 1]}
      colors={["#B5F69A", "#9DF9AC"]}
      style={styles.background}
    ></LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    width: "100%",
  },
});

export default BackgroundGradient;
