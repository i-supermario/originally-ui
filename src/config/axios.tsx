import { SETTINGS } from "@/api/settings";
import axios from "axios";

export const AxiosInstance = axios.create({

  baseURL: SETTINGS().URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },

})