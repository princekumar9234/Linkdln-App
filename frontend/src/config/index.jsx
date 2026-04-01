import axios from "axios";

export const clientServer = axios.create({
  baseURL: "http://loaclhost:8080",
});
