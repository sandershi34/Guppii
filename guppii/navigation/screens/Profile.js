import * as React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profile}>Skills</Text>
      <Text style={styles.profile}>Preferences</Text>
      <Text style={styles.profile}>Account Information</Text>
      <Text style={styles.profile}>Other Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    fontSize:26,
    marginTop: "6%",
    marginLeft: "10%",
  },
  profileContainer:{
    marginTop: "10%",
    marginLeft: "5%",
    height: "80%",
    width: "80%",
    borderLeftWidth: 2,
  },
});

