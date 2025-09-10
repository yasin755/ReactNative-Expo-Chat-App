import { View, Text, Image, Alert } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { myAxios } from "@/helper/apiServices";
import { useAuth } from "@/helper/GlobalProvider";

interface ProfileProps {
  setOpenEdit: any;
  openEdit: boolean;
}

const Profile = ({ setOpenEdit, openEdit }: ProfileProps) => {
  const { signOut, user } = useAuth();

  const handleEditOpen = () => {
    setOpenEdit(true);
    //console.log("user: ", user);
  };

  const handleSignOut = async () => {
    try {
      await myAxios("/auth/logout");
      signOut()
        .then(() => {
          Alert.alert("Sign Out Successfully.", "You have been logged out.");
          router.push("/signin");
        })

        .catch((error: any) => {
          Alert.alert("Sign Out unsccessfully.", "Something went wrong.");
        });
    } catch (error) {
      signOut()
        .then(() => {
          Alert.alert("Sign Out Successfully.", "You have been logged out.");
          router.push("/signin");
        })
        .catch((error: any) => {
          Alert.alert("Sign Out unsccessfully.", "Something went wrong.");
        });
    }
  };
  return (
    <View className="w-full justify-center items-center px-4 my-6 h-[80vh]">
      <Text className="text-3xl text-white font-bold text-center">Profile</Text>
      <Image
        source={user?.profilePic ? { uri: user.profilePic } : profile}
        className="w-[130px] h-[130px] rounded-full mt-7 border border-white "
      />
      <Text className="mt-7 text-3xl text-secondary font-semibold">
        {user?.fullName}
      </Text>
      <Text className="mt-1 text-base text-gray-100 font-semibold">
        @{user?.username}
      </Text>
      <Text className="mt-1 text-base text-gray-100 font-semibold">
        {user?.email}
      </Text>
      <CustomButton
        title="Edit Profile"
        handlePress={handleEditOpen}
        containerStyles="mt-7 w-full bg-secondary min-h-[40px]"
        textStyles={"text-xl text-white font-semibold uppercase"}
      />
      <CustomButton
        title="Sign Out"
        handlePress={handleSignOut}
        containerStyles="mt-3 w-full bg-red-500 min-h-[40px]"
        textStyles={"text-xl text-white font-semibold uppercase"}
      />
    </View>
  );
};

export default Profile;
