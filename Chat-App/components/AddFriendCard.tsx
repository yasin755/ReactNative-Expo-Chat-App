import { View, Text, Image, Alert } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import CustomButton from "./CustomButton";
import { User } from "@/types/User";
import { myAxios } from "@/helper/apiServices";

interface AddFriendCardProps {
  user: User;
  updateConnectionStatus: (userId: string, newStatus: string | null) => void;
}

const AddFriendCard: React.FC<AddFriendCardProps> = ({
  user,
  updateConnectionStatus,
}) => {
  const handleRequestToggle = async () => {
    try {
      if (user.connectionStatus === "sent") {
        // Cancel request
        await myAxios.post(`/connection/send-request?receiverId=${user.id}`);
        updateConnectionStatus(user.id, null);
      } else {
        // Send request
        await myAxios.post(`/connection/send-request?receiverId=${user.id}`);
        updateConnectionStatus(user.id, "sent");
      }
    } catch (error: any) {
      if (error.response) {
        Alert.alert("Error!", error.response.data.message);
      }
    }
  };

  return (
    <View className="py-4 px-4 flex-row items-center justify-between border-b border-white/10">
      <View className="flex-row items-center space-x-5">
        <Image
          width={10}
          height={10}
          source={user.profilePic ? { uri: user.profilePic } : profile}
          className="w-[60px] h-[60px] rounded-full mr-3"
        />
        <View className="">
          <Text className="text-white text-[18px] font-semibold mb-1">
            {user.fullName}
          </Text>
          <Text className="text-[12px] text-gray-200 font-semibold mb-1">
            @{user.username}
          </Text>
        </View>
      </View>
      <CustomButton
        title="Connect"
        handlePress={handleRequestToggle}
        containerStyles="bg-secondary px-3 py-2"
        textStyles="text-white font-semibold"
        isLoading={false}
      />
      {/* <CustomButton
        title="Cancel"
        handlePress={() => {}}
        containerStyles="bg-red-500 px-3 py-2"
        textStyles="text-white font-semibold"
        isLoading={false}
      /> */}
    </View>
  );
};

export default AddFriendCard;
