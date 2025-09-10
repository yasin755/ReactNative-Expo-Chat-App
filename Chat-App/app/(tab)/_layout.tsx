import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabIcon = ({
  icon,
  name,
  focused,
}: {
  icon: any;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className="flex flex-1 items-center w-full justify-center">
      <Ionicons name={icon} size={24} color={focused ? "purple" : "gray"} />
      <Text
        className={
          focused ? "font-semibold text-white" : "font-normal text-gray-400"
        }
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#7C3AED",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="chat"
          options={{
            headerShown: false,
            title: "Chat",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"chatbubble"} name="Chat" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="request"
          options={{
            headerShown: false,
            title: "Request",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"people"} name="Request" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"person"} name="Profile" focused={focused} />
            ),
          }}
        />
      </Tabs>
      <StatusBar barStyle={"light-content"} />
    </>
  );
};

export default TabLayout;
