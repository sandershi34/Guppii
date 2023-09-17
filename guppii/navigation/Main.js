import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Sceens
import Explore from "./screens/Explore";
import Messages from "./screens/Messages";
import Profile from "./screens/Profile";
import Search from "./screens/Search";

// Screen names
const exploreName = "Explore Guppii";
const searchName = "Find People";
const messagesName = "Messages";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

export default function Main({ navigation }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={exploreName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === exploreName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === searchName) {
              iconName = focused ? "search" : "search-outline";
            } else if (rn === messagesName) {
              iconName = focused ? "chatbox" : "chatbox-outline";
            } else if (rn === profileName) {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "green",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name={exploreName} component={Explore} />
        <Tab.Screen name={searchName} component={Search} />
        <Tab.Screen name={messagesName} component={Messages} />
        <Tab.Screen name={profileName} component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
