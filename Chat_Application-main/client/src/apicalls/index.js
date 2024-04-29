// The purpose of this code is to simplify the process of making API requests to your backend by automatically including an authentication token (JWT) in the header of each request.

import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});