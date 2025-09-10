//import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { router } from "expo-router";

//const apiURL = "http://192.168.1.78:8000";
//const apiURL = "http://localhost:8000";
//const apiURL = "http://192.168.1.34:8000";
const apiURL = "https://reactnative-expo-chat-app.onrender.com";
const baseUrl = `${apiURL}/api`;

const myAxios: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
});

export { myAxios, apiURL };