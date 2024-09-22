import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

export const makeRequest = async (url, options) => {
  return api(url, options)
    .then((res) => res.data)
    .catch((err) => err?.response?.data?.message ?? "Something went wrong");
};
