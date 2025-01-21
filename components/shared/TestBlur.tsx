import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useColors } from "../../colors";

export default function TestBlur() {
    const colors = useColors();
  return (
    <View style={styles.container}>
      <Image
        key={'blurryImage'}
        source={{ uri : "https://img.freepik.com/free-photo/hex-background-networking_52683-137877.jpg?t=st=1737042691~exp=1737046291~hmac=9e14e3df850849efeb356c715412e5701bea978f57fa71adcfc17fcf8f375fe7&w=1380" }}
        style={styles.absolute}
      />
      <Text style={styles.absolute}>Hi, I am some blurred text</Text>
      {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor={colors.primary}
      />
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});