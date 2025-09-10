import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import logo from "@/assets/logo.png";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { myAxios } from "@/helper/apiServices";

const signup = () => {
  const [form, setform] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    let alertMsg = "";

    if (!form.fullName) {
      alertMsg = "Full name is required";
    }

    if (!alertMsg && !form.email) {
      alertMsg = "Email is required";
    }

    if (!alertMsg && !form.password) {
      alertMsg = "Password is required";
    }

    if (!alertMsg && form.password !== form.confirmPassword) {
      alertMsg = "Passwords do not match";
    }

    if (alertMsg) {
      Alert.alert("Error", alertMsg);
      alertMsg = "";
      return;
    }

    setIsLoading(true);
    try {
      console.log("Form data:", form);
      const response = await myAxios.post("/auth/register", form);
      console.log("Response data:", response.status);
      Alert.alert("Info!", "You have been registered.");
      setform({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/signin");
    } catch (error: any) {
      console.log("Error msg:", error?.message);

      if (error.response) {
        // Check if API sent a message
        const errMsg = error.response.data.message || "Something went wrong!";
        Alert.alert("Error", errMsg);
        console.log("Error Response:", error.response.data);
      } else if (error.request) {
        // No response from server
        Alert.alert("Error", "No response from server. Please try again.");
        console.log("Error Request:", error.request);
      } else {
        // Something else went wrong
        Alert.alert("Error", error.message);
        console.log("Error Message:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ScrollView>
          <View className="min-h-screen">
            <View className="h-[90vh] w-full justify-center items-center px-4 my-6">
              <Image
                source={logo}
                className="w-[130px]  h-[130px]"
                resizeMode="contain"
              />
              <Text className="text-3xl text-white font-bold text-center">
                Sign Up
              </Text>
              <FormField
                title="FullName*"
                value={form.fullName}
                handleChange={(e: any) =>
                  setform({
                    ...form,
                    fullName: e,
                  })
                }
                otherStyles="mt-7"
                placeholder="Enter your full name..."
              />
              <FormField
                title="Email*"
                value={form.email}
                handleChange={(e: any) =>
                  setform({
                    ...form,
                    email: e,
                  })
                }
                otherStyles="mt-7"
                placeholder="Enter your email..."
              />
              <FormField
                title="Password*"
                value={form.password}
                handleChange={(e: any) =>
                  setform({
                    ...form,
                    password: e,
                  })
                }
                otherStyles="mt-5"
                placeholder="Enter your password..."
              />
              <FormField
                title="Confirm Password*"
                value={form.confirmPassword}
                handleChange={(e: any) =>
                  setform({
                    ...form,
                    confirmPassword: e,
                  })
                }
                otherStyles="mt-5"
                placeholder="Re-enter your password..."
              />
              <CustomButton
                title={isLoading ? "Loading..." : "Sign Up"}
                handlePress={handleSignUp}
                containerStyles={"py-2 px-3 bg-secondary w-full mt-7"}
                textStyles={"text-xl text-white font-semibold uppercase"}
                isLoading={isLoading}
              />
              <View className="justify-center items-center pt-5 flex-row gap-2">
                <Text className="text-base text-gray-100 font-normal">
                  Already have an account?{" "}
                  <Link className="text-secondary font-bold" href={"/signin"}>
                    Sign In
                  </Link>{" "}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default signup;
